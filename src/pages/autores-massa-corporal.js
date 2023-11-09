export default function AutoresMassaCorporalMagra() {
    return (
        <section className="autores-formulas">
            <div id="boer">
                <h3 className="text-center py-2.5">Quem é P.  Boer?</h3>
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

                <p>Essa fórmula foi proposta pelo pesquisador Boer em um estudo publicado em 1984, intitulado
                    <em>&ldquo;Estimation of body composition: a critical evaluation of the dual-energy X-ray absorptiometry method&ldquo;</em>.
                    No estudo, Boer desenvolveu uma equação para estimar a massa corporal magra em uma população de homens e mulheres idosos.</p>

                <p>No entanto, é importante observar que essa fórmula foi desenvolvida para uma população específica e
                    pode não ser adequada para todos os grupos de pessoas, como crianças, atletas de alto desempenho ou indivíduos com
                    condições médicas específicas. Além disso, é uma estimativa e pode não ser tão precisa quanto métodos mais avançados,
                    como a absorciometria de raios X de dupla energia (DXA).</p>
            </div>
            <div id="james">
                <h3 className="text-center py-2.5">Quem é W. P. T. James</h3>
                <p>É um dos pesquisadores do Conselho de Pesquisa Médica do Reino Unido
                    em Cambridge, tendo especialização em nutrição
                    que criou uma fórmula utilizada para calcular a estimativa da massa corporal magra
                    com base no peso corporal e na altura do índividuo. Onde difere ligeiramente para homens e mulheres. </p>
                <p>Aqui estão as equações:</p>

                <p className="homens">Homens:</p>
                <span className="texto-destaque">
                    Massa Corporal Magra (kg) = (1.1 &#10005; peso) - 128 &#10005; (peso / altura)<sub>2</sub>
                </span>

                <p className="mulheres">Mulheres:</p>
                <span className="texto-destaque">
                    Massa Corporal Magra (kg) = (1.07 &#10005; peso) - 148 &#10005; (peso / altura)<sub>2</sub>
                </span>

                <p>No cálculo acima, será representada a estimativa da massa corporal magra em quilogramas (kg), tomando como base o peso
                    corporal em quilogramas (kg) e a altura em centímetros (cm).</p>

                <p>A fórmula de James é uma das várias equações usadas para estimar a massa corporal magra. </p>
            </div>

            <p>Sempre é recomendado consultar um profissional de saúde qualificado para obter uma avaliação mais precisa da sua composição
                corporal juntamente com outros métodos mais avançados.</p>

            <hr />
            <div className="fontes">
                <small className="referencias">Referências:</small>
                <a href="https://pubmed.ncbi.nlm.nih.gov/6496691/" target="_blank">
                    - P. Boer,
                    <strong> Estimated lean body mass as an index for normalization of body fluid volumes in humans</strong>,
                    A report of the DHSS/MRC group, Department of Health and Social Security/Medical Research Council, 1976
                </a>
                <a href="https://onlinelibrary.wiley.com/doi/10.1111/j.1467-3010.1977.tb00966.x" target="_blank">
                    - W. P. T. James,
                    <strong> Research on obesity</strong>,
                    American Physiological Society, 1984
                </a>
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC473290/" target="_blank">
                    - R. Hume,
                    <strong> Prediction of lean body mass from height and weight</strong>,
                    Journal of Clinical Pathology, 1966
                </a>
                <a href="https://www.flaticon.com/br/" title="musculo ícone" target="_blank">
                    - ícones criados por justicon - flaticon
                </a>
            </div>
        </section>
    )
}