import Image from "next/image";
import Link from "next/link";

function MenuNavegacao() {
    return (
        <header>
            <nav className="navegacao">
                <div>
                    <Link href="/" className="marca" aria-label="Calculadora do Corpo — início">
                        <Image src="/images/logo.svg" alt="" width={40} height={40} className="logo" />
                        <span className="titulo-menu">Calculadora do Corpo</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default MenuNavegacao;
