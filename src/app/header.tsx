"use client";
import dynamic from "next/dynamic";
import React from "react";

const DynamicDrawer = dynamic(() => import("@/components/Drawer/Drawer"), {
  ssr: false,
});

const Header: React.FC = () => {
  return (
    <header className="flex justify-center p-10"
    style={{
      padding:" 10% 0 ",
      backgroundImage: `url('/logo.jpg')`,
      backgroundPosition: 'center', // Centraliza a imagem de fundo
      backgroundRepeat: 'no-repeat', // Previne a repetição da imagem
      backgroundSize: '380px' // Faz a imagem cobrir toda a área disponível
    }}>
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between">
          <nav className="flex items-center">
            {/* <DynamicDrawer /> */}
          </nav>
          <div className="flex items-center">
            {/* <div className="mr-4">LOGO</div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
