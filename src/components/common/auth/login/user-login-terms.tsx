import Link from "next/link";
import React from "react";

const UserLoginTerms = () => {
  return (
    <div className="w-full py-6 text-gray-500 text-wrap">
      En continuant, tu acceptes les{" "}
      <Link
        target="_blank"
        href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&amp;country=FR&amp;language=fr&amp;requestType=redirect&amp;uxId=4fd2d5e7db76e0f85a6bb56721bd51df"
        rel="noopener noreferrer"
        className="underline"
      >
        conditions d&apos;utilisation
      </Link>{" "}
      et tu confirmes avoir lu la{" "}
      <Link
        target="_blank"
        href="https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&amp;country=FR&amp;language=fr&amp;requestType=redirect&amp;uxId=4fd2d5e7db76e0f85a6bb56721bd51df"
        rel="noopener noreferrer"
        className="underline"
      >
        politique de confidentialité
      </Link>{" "}
      de Nike.
    </div>
  );
};

export default UserLoginTerms;
