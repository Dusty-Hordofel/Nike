import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import { stripe } from "@/lib/stripe"; // Vous avez déjà initialisé stripe ici
import Order from "@/models/Order";
import PaymentMethod from "@/models/PaymentMethod";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

type PaymentResult = {
  id: string;
  status: string;
  email?: string; // Modifiez si nécessaire
};

export const POST = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json(
      { error: true, message: "unauthorized" },
      { status: 401 }
    );
  }

  const {
    products,
    shippingAddress,
    couponApplied,
    totalBeforeDiscount,
    total,
    paymentMethod,
  } = await req.json();

  try {
    // Connexion à la base de données
    await connectDB();

    // Vérifier l'existence de l'utilisateur
    const dbUser = await User.findById(req.auth?.user._id);
    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: true, message: "Unauthorized User" },
        { status: 400 }
      );
    }

    // Créer ou récupérer un client Stripe
    let customerId = dbUser.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: dbUser.email,
        name: `${dbUser.firstName} ${dbUser.lastName}`,
      });
      customerId = customer.id;
      dbUser.stripeCustomerId = customerId;
      await dbUser.save();
    }

    // Récupérer la méthode de paiement active
    const paymentMethodDoc = await PaymentMethod.findOne({ isActive: true });
    if (!paymentMethodDoc) {
      return NextResponse.json(
        { success: false, error: true, message: "Payment method not found" },
        { status: 404 }
      );
    }

    // Vérifier si la méthode de paiement est déjà attachée au client
    const existingPaymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    const isAlreadyAttached = existingPaymentMethods.data.some(
      (pm) => pm.id === paymentMethodDoc.paymentMethodId
    );

    let updatedPaymentMethods;
    let isNowAttached;

    if (!isAlreadyAttached) {
      // Si la méthode de paiement n'est pas encore attachée, l'attacher
      await stripe.paymentMethods.attach(paymentMethodDoc.paymentMethodId, {
        customer: customerId,
      });

      // Vérifier à nouveau après l'attachement pour confirmer
      updatedPaymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: "card",
      });

      isNowAttached = updatedPaymentMethods.data.some(
        (pm) => pm.id === paymentMethodDoc.paymentMethodId
      );

      // if (!isNowAttached) {
      //   throw new Error('Échec de l\'attachement de la méthode de paiement.');
      // }

      if (isNowAttached) {
        console.log("La méthode de paiement a été correctement attachée.");
      } else {
        console.error("Échec de l'attachement de la méthode de paiement.");
      }
    } else {
      console.log("La méthode de paiement est déjà attachée.");
    }

    // console.log("🚀 ~ POST ~ existingPaymentMethods:2", existingPaymentMethods);

    // Mettre à jour la méthode de paiement principale du client
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodDoc.paymentMethodId,
      },
    });

    const payment = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "USD",
      description: "Nike Store",
      customer: customerId, // ID du client
      payment_method: paymentMethodDoc.paymentMethodId, // Méthode de paiement à utiliser
      // payment_method: paymentMethodId, // Méthode de paiement à utiliser
      off_session: true, // Pour les paiements qui ne nécessitent pas d'interaction de l'utilisateur
      confirm: true, // Confirme le paiement immédiatement
      receipt_email: dbUser.email,
      // payment_method: payment_method.paymentMethodId,
      // confirm: true,
      // return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`, // Spécifiez l'URL de retour après le paiement
    });

    return NextResponse.json({
      success: true,
      error: false,
      dbUser,
      updatedPaymentMethods,
      isNowAttached,
      isAlreadyAttached,
      payment,
      // customer,
      // existingPaymentMethods,
      // isAlreadyAttached,
      // paymentMethodDoc,
      // make,
      // payment,
      // payment_method,
      // payment,
    });
    // return NextResponse.json({ success: true, error: false });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: true, message: error.message },
      { status: 500 }
    );
  }
});

async function createPaymentIntent(
  amount: number,
  currency: string,
  description: string,
  customerId: string,
  paymentMethodId: string
) {
  try {
    // Créer un PaymentIntent avec la méthode de paiement attachée
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Montant du paiement en cents (100 cents = 1 USD)
      currency: currency, // Devise
      description: description,
      customer: customerId, // ID du client
      payment_method: paymentMethodId, // Méthode de paiement à utiliser
      off_session: true, // Pour les paiements qui ne nécessitent pas d'interaction de l'utilisateur
      confirm: true, // Confirme le paiement immédiatement
    });

    console.log("PaymentIntent créé avec succès:", paymentIntent.id);
    return paymentIntent;
  } catch (error) {
    console.error("Erreur lors de la création du PaymentIntent:", error);
    throw error;
  }
}

async function verifyAndAttachPaymentMethod(
  customerId: string,
  paymentMethodId: string
) {
  try {
    // Récupérer les méthodes de paiement attachées au client
    const existingPaymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    // Vérifier si la méthode de paiement est déjà attachée
    const isAlreadyAttached = existingPaymentMethods.data.some(
      (pm) => pm.id === paymentMethodId
    );

    let updatedPaymentMethods;
    let isNowAttached = false;

    if (!isAlreadyAttached) {
      // Si la méthode de paiement n'est pas encore attachée, l'attacher
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      // Vérifier à nouveau après l'attachement pour confirmer
      updatedPaymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: "card",
      });

      isNowAttached = updatedPaymentMethods.data.some(
        (pm) => pm.id === paymentMethodId
      );

      if (!isNowAttached) {
        throw new Error("Échec de l'attachement de la méthode de paiement.");
      }
    } else {
      console.log("La méthode de paiement est déjà attachée.");
    }

    // Retourner les valeurs souhaitées
    return { updatedPaymentMethods, isNowAttached };
  } catch (error) {
    console.error(
      "Erreur lors de la vérification et de l'attachement de la méthode de paiement:",
      error
    );
    throw error;
  }
}

// async function handlePayment(customerId:string, paymentMethodId:string, amount:number) {
//   try {
//     // Appeler verifyAndAttachPaymentMethod et récupérer les valeurs retournées
//     const { updatedPaymentMethods, isNowAttached } = await verifyAndAttachPaymentMethod(customerId, paymentMethodId);

//     // Vous pouvez maintenant utiliser updatedPaymentMethods et isNowAttached
//     console.log('Méthodes de paiement mises à jour:', updatedPaymentMethods);
//     console.log('La méthode de paiement est-elle maintenant attachée?', isNowAttached);

//     // Si la méthode de paiement est bien attachée, créer le PaymentIntent
//     if (isNowAttached) {
//       const paymentIntent = await createPaymentIntent(customerId, paymentMethodId, amount);

//       // Vérifier l'état du PaymentIntent
//       if (paymentIntent.status === 'succeeded') {
//         console.log('Paiement réussi');
//       } else if (paymentIntent.status === 'requires_action') {
//         console.log('Le paiement nécessite une action supplémentaire (3D Secure, etc.)');
//         // Vous devrez gérer cette étape côté client pour compléter l'authentification si nécessaire
//       } else {
//         console.log('Le paiement est en attente ou a échoué:', paymentIntent.status);
//       }
//     }
//   } catch (error) {
//     console.error('Erreur lors du processus de paiement:', error);
//   }
// }
