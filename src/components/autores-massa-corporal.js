export default function AutoresMassaCorporalMagra() {
    return (
        <section className="autores-formulas">
            <div id="boer">
                <h3 className="text-center py-2.5">Quem é P. Boer?</h3>
                <p>A fórmula de Boer é uma equação utilizada para estimar a massa corporal magra com base no peso corporal e
                    na altura. A fórmula é a seguinte:</p>

                <p className="homens">Homens:</p>
                <span className="texto-destaque">
                    Massa Corporal Magra (kg) = (0.407 &#10005; peso) + (0.267 &#10005; altura) - 19.2
                </span>
                <p className="mulheres">Mulheres:</p>
                <span className="texto-destaque">
                    Massa Corporal Magra (kg) = (0.252 &#10005; peso) + (0.473 &#10005; altura) - 48.3
                </span>

                <p>P. Boer é o pesquisador que publicou, em 1984, o estudo
                    <em> Estimated lean body mass as an index for normalization of body fluid volumes in humans</em>.
                    O trabalho avaliou o uso da massa corporal magra estimada como referência para comparar volumes de líquidos
                    corporais em homens e mulheres saudáveis.</p>

                <p>No entanto, é importante observar que essa fórmula foi desenvolvida para uma população específica e
                    pode não ser adequada para todos os grupos de pessoas, como crianças, atletas de alto desempenho ou indivíduos com
                    condições médicas específicas. Além disso, é uma estimativa e pode não ser tão precisa quanto métodos mais avançados,
                    como a absorciometria de raios X de dupla energia (DXA).</p>
            </div>
            <div id="james">
                <h3 className="text-center py-2.5">Quem é W. P. T. James?</h3>
                <p>É um dos pesquisadores do Conselho de Pesquisa Médica do Reino Unido
                    em Cambridge, tendo especialização em nutrição
                    que criou uma fórmula utilizada para calcular a estimativa da massa corporal magra
                    com base no peso corporal e na altura do índividuo. Onde difere ligeiramente para homens e mulheres. </p>
                <p>Aqui estão as equações:</p>

                <p className="homens">Homens:</p>
                <span className="texto-destaque">
                    Massa Corporal Magra (kg) = (1.1 &#10005; peso) - 128 &#10005; (peso / altura)<sup>2</sup>
                </span>

                <p className="mulheres">Mulheres:</p>
                <span className="texto-destaque">
                    Massa Corporal Magra (kg) = (1.07 &#10005; peso) - 148 &#10005; (peso / altura)<sup>2</sup>
                </span>

                <p>No cálculo acima, será representada a estimativa da massa corporal magra em quilogramas (kg), tomando como base o peso
                    corporal em quilogramas (kg) e a altura em centímetros (cm).</p>

                <p>A fórmula de James é uma das várias equações usadas para estimar a massa corporal magra. </p>
            </div>
            <div id="hume">
                <h3 className="text-center py-2.5">Quem foi R. Hume?</h3>
                <p>R. Hume foi um pesquisador do Departamento de Medicina do Southern General Hospital, em Glasgow,
                    na Escócia. Em 1966, publicou no <em>Journal of Clinical Pathology</em> o estudo
                    <em> Prediction of lean body mass from height and weight</em>, no qual apresentou equações para
                    estimar a massa corporal magra a partir do peso e da altura.</p>

                <p>O estudo incluiu 29 homens e 27 mulheres e apresentou uma equação para cada grupo:</p>
                <p className="homens">Homens:</p>
                <span className="texto-destaque">
                    Massa Corporal Magra (kg) = (0,32810 &#10005; peso) + (0,33929 &#10005; altura) - 29,5336
                </span>
                <p className="mulheres">Mulheres:</p>
                <span className="texto-destaque">
                    Massa Corporal Magra (kg) = (0,29569 &#10005; peso) + (0,41813 &#10005; altura) - 43,2933
                </span>

                <p>Nas duas equações, o peso deve ser informado em quilogramas (kg) e a altura em centímetros (cm).
                    O resultado é uma estimativa da massa corporal magra e não uma medição direta da quantidade de músculos.
                    Pessoas com o mesmo peso e altura podem ter composições corporais diferentes.</p>
            </div>

            <p>Sempre é recomendado consultar um profissional de saúde qualificado para obter uma avaliação mais precisa da sua composição
                corporal juntamente com outros métodos mais avançados.</p>

            <hr />
            <div className="fontes">
                <small className="referencias">Referências:</small>
                <a href="https://pubmed.ncbi.nlm.nih.gov/6496691/" target="_blank" rel="noopener noreferrer">
                    - P. Boer,
                    <strong> Estimated lean body mass as an index for normalization of body fluid volumes in humans</strong>,
                    American Journal of Physiology, 247(4):F632–F636, 1984
                </a>
                <a href="https://www.ncbi.nlm.nih.gov/nlmcatalog/7802249" target="_blank" rel="noopener noreferrer">
                    - W. P. T. James,
                    <strong> Research on obesity</strong>,
                    Relatório do grupo DHSS/MRC, Londres: HMSO, 1976
                </a>
                <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC473290/" target="_blank" rel="noopener noreferrer">
                    - R. Hume,
                    <strong> Prediction of lean body mass from height and weight</strong>,
                    Journal of Clinical Pathology, 19(4):389–391, 1966. DOI: 10.1136/jcp.19.4.389
                </a>

            </div>
        </section>
    )
}
