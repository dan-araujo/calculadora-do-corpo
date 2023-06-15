export default function AutoresTMB() {
    return (
        <section className="autores-formulas">
            <div id="benedict">
                <h4>O que é a fórmula de Harris-Benedict?</h4>
                <p>É uma equação amplamente utilizada para estimar as necessidades
                    calóricas diárias de uma pessoa, com base em seu sexo, altura, peso e idade. Essa fórmula foi desenvolvida
                    por James Arthur Harris e Francis Gano Benedict em 1919.</p>
                <p>
                    Existem duas versões principais da fórmula de Harris-Benedict: uma para homens e outra para mulheres. Aqui estão as equações:
                </p>
                <p className="homens">Homens:</p>
                <span className="texto-destaque">
                    TMB (Taxa Metabólica Basal) = (88.4 + 13.4 * peso) + (4.8 * altura) - (5.68 * idade)
                </span>
                <p className="mulheres">Mulheres:</p>
                <span className="texto-destaque">
                    TMB (Taxa Metabólica Basal) = (447.6 + 9.25 * peso) + (3.10 * altura) - (4.33 * idade)
                </span>
                <p>Essas equações fornecem uma estimativa da taxa metabólica basal (TMB),
                    que é a quantidade de calorias que o corpo precisa para manter suas funções básicas em repouso,
                    sem levar em consideração a atividade física. Para obter uma estimativa mais precisa das necessidades calóricas diárias,
                    o valor da TMB pode ser multiplicado por um fator correspondente ao nível de atividade física da pessoa.
                </p>
            </div>

            <div id="mcardle">
                <h4>O que é a fórmula de Katch-McArdle?</h4>
                <p>Katch-McArdle é um termo que se refere a uma fórmula utilizada para estimar a Taxa Metabólica Basal (TMB) de
                    uma pessoa. Levando em consideração a composição corporal, especificamente a massa magra
                    ou massa livre de gordura.</p>

                <p>A fórmula de Katch-McArdle é a seguinte:</p>

                <span className="texto-destaque">
                    TMB (Taxa Metabólica Basal) = 370 + (21.6 x Massa Magra em kg)
                    </span>

                <p>A massa magra é calculada subtraindo-se o percentual de gordura corporal total do peso corporal total.
                    É importante ressaltar que essa fórmula é mais precisa para pessoas que possuem uma medição precisa da
                    composição corporal,
                    como a partir de uma avaliação por bioimpedância, dexa scan ou outras técnicas confiáveis.</p>

                <p>É nomeada em homenagem aos pesquisadores William McArdle e Frank Katch,
                    que conduziram estudos na área da fisiologia do exercício e metabolismo. Eles contribuíram para o
                    desenvolvimento de
                    várias equações e fórmulas relacionadas à estimativa do gasto energético e taxa metabólica basal.</p>

                <p>Também é uma alternativa à fórmula de Harris-Benedict, que também é usada para estimar a TMB,
                    mas não leva em consideração a composição corporal. Katch-McArdle é considerada mais precisa
                    para pessoas com uma composição corporal conhecida, especialmente aquelas que possuem uma quantidade
                    significativa de massa muscular.
                </p>
            </div>
        </section>
    );
}