import Image from "next/image";
import Link from "next/link";

function MenuNavegacao() {
    return (
        <header>
            <nav className="navegacao">
                <div className="flex flex-row">
                    <Link href="/">
                        <Image src={"/images/logo.png"} alt="Logo" width={40} height={40} className="logo" />
                    </Link>
                    <Link href="/">
                        <p className="titulo-menu drop-shadow-lg">Calculadora do Corpo</p>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default MenuNavegacao;