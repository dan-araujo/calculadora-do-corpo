import Image from "next/image"
import Link from "next/link"
export default function Home() {
    return (
        <main className="my-28">
            <section className="container-principal flex justify-around items-center">
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/imc">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2.5 flex flex-col mx-2.5 justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/imc.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl font-semibold text-center titulo-card">Índice Massa Corporal</h3>              
                        </div>
                    </Link>
                </div>
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/peso-ideal">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2 flex mx-2.5 flex-col justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/balanca.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl  font-semibold text-center drop-shadow-lg titulo-card">Peso Ideal</h3>
                        </div>
                    </Link>
                </div>
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/calorias">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2 flex mx-2.5 flex-col justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/calorias.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl  font-semibold text-center titulo-card">Calorias</h3>
                        </div>
                    </Link>
                </div>
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/tmb">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2 flex mx-2.5 flex-col justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/tmb2.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl  font-semibold text-center titulo-card">Taxa Metabólica Basal</h3>
                        </div>
                    </Link>
                </div>
            </section>
            <section className="container-principal flex justify-around w items-center">
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/gordura-corporal">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2.5 flex flex-col mx-2.5 justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/gordura-corporal.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl  font-semibold text-center titulo-card">Nível de Gordura Corporal</h3>              
                        </div>
                    </Link>
                </div>
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/potencial-maximo-muscular">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2 flex mx-2.5 flex-col justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/maximo-potencial-muscular.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl  font-semibold text-center titulo-card">Potencial Máximo Muscular</h3>
                        </div>
                    </Link>
                </div>
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/repeticao-maxima">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2 flex mx-2.5 flex-col justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/1rm.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl  font-semibold text-center titulo-card">1 Repetição Máxima (1RM)</h3>
                        </div>
                    </Link>
                </div>
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/massa-corporal-magra">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2 flex mx-2.5 flex-col justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/massa-corporal-magra.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl  font-semibold text-center titulo-card">Massa Corporal Magra</h3>
                        </div>
                    </Link>
                </div>
            </section>
            <section className="container-principal flex justify-around w items-center">
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/carboidratos">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2.5 flex flex-col mx-2.5 justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/carboidratos2.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl  font-semibold text-center titulo-card">Carboidratos</h3>              
                        </div>
                    </Link>
                </div>
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/proteinas">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2 flex mx-2.5 flex-col justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/proteinas2.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl  font-semibold text-center titulo-card">Proteinas</h3>
                        </div>
                    </Link>
                </div>
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/gorduras-saudaveis">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2 flex mx-2.5 flex-col justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/manteiga-de-amendoim.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl  font-semibold text-center titulo-card">Gorduras Boas</h3>
                        </div>
                    </Link>
                </div>
                <div className="container-card hover:text-pureWhite w-1/5">
                    <Link href="/consumo-agua">
                        <div className="h-full w-full bg-pureWhite rounded-xl py-2 flex mx-2.5 flex-col justify-center shadow duration-300 hover:bg-blueVariation hover:shadow-xl hover:text-sky-400">
                            <Image src={"/images/agua.png"} alt="Icone" width={200} height={200}
                                className="imagem-card" style={{ margin: '0 auto' }} />
                            <h3 className="mt-2 text-xl  font-semibold text-center titulo-card">Consumo de Água</h3>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    )
}
