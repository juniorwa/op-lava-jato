import Image from "next/image";
import React from "react";

const GoogleIcon: React.FC = () => {
  return (
    <Image
      width="24"
      height={24}
      alt='Google "G" Logo'
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
    />
  );
};

export default GoogleIcon;
