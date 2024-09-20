import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  CreditCard,
  FileText,
  BarChart2,
  Settings,
  MessageSquare,
  Truck,
  Tag,
  Percent,
  Gift,
  HelpCircle,
  AlertCircle,
  Boxes,
  Palette,
  Image,
  Mail,
  ShieldCheck,
  Activity,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
      <div className="p-5">
        <h1 className="text-2xl font-bold">E-commerce Admin</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="px-2">
          <li className="mb-2">
            <Link
              href="/dashboard"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <LayoutDashboard className="mr-3" size={20} />
              Tableau de bord
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/orders"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <ShoppingCart className="mr-3" size={20} />
              Commandes
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/products"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Package className="mr-3" size={20} />
              Produits
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/categories"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Boxes className="mr-3" size={20} />
              Catégories
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/customers"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Users className="mr-3" size={20} />
              Clients
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/payments"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <CreditCard className="mr-3" size={20} />
              Paiements
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/invoices"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <FileText className="mr-3" size={20} />
              Factures
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/analytics"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <BarChart2 className="mr-3" size={20} />
              Analyses
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/marketing"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Percent className="mr-3" size={20} />
              Marketing
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/discounts"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Tag className="mr-3" size={20} />
              Réductions
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/shipping"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Truck className="mr-3" size={20} />
              Expédition
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/reviews"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <MessageSquare className="mr-3" size={20} />
              Avis
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/gift-cards"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Gift className="mr-3" size={20} />
              Cartes cadeaux
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/inventory"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Boxes className="mr-3" size={20} />
              Inventaire
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/design"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Palette className="mr-3" size={20} />
              Design
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/media"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Image className="mr-3" size={20} />
              Médias
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/newsletters"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Mail className="mr-3" size={20} />
              Newsletters
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/security"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <ShieldCheck className="mr-3" size={20} />
              Sécurité
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/logs"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Activity className="mr-3" size={20} />
              Logs
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/settings"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <Settings className="mr-3" size={20} />
              Paramètres
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href="/help"
              className="flex items-center p-2 rounded hover:bg-gray-700"
            >
              <HelpCircle className="mr-3" size={20} />
              Aide
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <Link
          href="/notifications"
          className="flex items-center p-2 rounded hover:bg-gray-700"
        >
          <AlertCircle className="mr-3" size={20} />
          Notifications
        </Link>
      </div>
    </div>
  );
}
