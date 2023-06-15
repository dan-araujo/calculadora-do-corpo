export default function AutoresPesoIdeal() {
    return (
        <section className="autores-formulas">
            <div id="peterson">
                <h4>O que é a Fórmula de Peterson?</h4>
                <p>É uma fórmula para peso ideal em criada 2016 por Peterson que se tornou uma alternativa
                    à Fórmula de Devine, visando corrigir possíveis subestimações em estaturas mais baixas
                    e superestimações em estaturas mais altas.</p>
                <p>A Fórmula de Peterson para estimar o peso corporal ideal:</p>
                <span className="texto-destaque">
                    2,2
                    &times;
                    IMC<em className="mr-1"><sub>objetivo </sub></em>
                    + 3,5
                    &times;
                    IMC<em className="mr-1"><sub>objetivo</sub></em>
                    &times;
                    (altura em metros - 1,5 metros)
                </span>
                <p>O IMC<em className="mr-1"><sub>objetivo </sub></em> na fórmula é onde se deve colocar o IMC que a
                    pessoa pretende ter ao atingir o peso ideal,
                    como padrão foi colocado o valor 22, e também a altura sendo calculada em centímetros
                </p>
            </div>

            <div id="robinson">
                <h4>O que é a Fórmula de Robinson?</h4>
                <p>J. D. Robinson criou essa fórmula para peso ideal juntamente com seus colaboradores em 1983.
                    É uma das muitas equações utilizadas para estimar o peso corporal ideal com base na altura.</p>
                <p>A fórmula de J. D. Robinson para estimar o peso corporal ideal:</p>
                <p className="homens">Homens:</p>
                <span className="texto-destaque">
                    Peso Ideal (kg) = 52 kgs + 1,9 kg por cada polegada (inches) depois de 5 pés (5 ft)
                </span>
                <p className="mulheres">Mulheres:</p>
                <span className="texto-destaque">
                    Peso Ideal (kg) = 49 kgs + 1,7 kg por cada polegada (inches) depois de 5 pés (5 ft)
                </span>
            </div>

            <div id="miller">
                <h4>O que é a Fórmula de Miller?</h4>
                <p>É uma das abordagens usadas para estimar o peso corporal ideal com base na altura em 1983.
                    Essa fórmula originalmente foi destinada a calcular a altura dos indivíduos as medidas
                    em pés (feet) e polegadas (inches).
                    Acima você consegue obter o resultado tranquilamente com a sua altura em centímetros</p>
                <p>De acordo com a fórmula de Miller, o peso corporal ideal é calculado da seguinte maneira:</p>
                <p className="homens">Homens:</p>
                <span className="texto-destaque">
                    Peso Ideal (kg) = 56,2 kg + 1,41 kg por cada centímetro acima de 5 pés (152,4 cm).
                </span>
                <p className="mulheres">Mulheres:</p>
                <span className="texto-destaque">
                    Peso Ideal (kg) = 53,1 kg + 1,36 kg por cada centímetro acima de 5 pés (152,4 cm).
                </span>
                <p>Vale ressaltar que 1 pé (1ft) é igual a 12 polegadas (12 inches), então a altura é convertida em
                    polegadas antes de aplicar a fórmula.</p>
                <p>Por exemplo, se uma mulher tem uma altura de 5 pés (5 ft),
                    seria definido os primeiros 5 pés (52,9 kgs) + as 2 polegadas (inches) subsequentes
                    (2 &times; 1,41 kg) = 56 kg</p>
                <p>Portanto, de acordo com a fórmula de Miller, o peso corporal ideal para uma mulher com 5 pés
                    polegadas (152 cm) seria de aproximadamente 52,9 kgs.</p>
            </div>

            <div id="devine">
                <h4>O que é a Fórmula de Devine?</h4>
                <p>A fórmula de Devine é uma das muitas abordagens usadas para estimar o peso corporal ideal
                    com base na altura. Essa fórmula é frequentemente referida como "fórmula de Devine" ou
                    "equação de Devine", em referência ao estudo original publicado por B. J. Devine em 1974.</p>
                <p>A fórmula de Devine para estimar o peso corporal ideal é a seguinte:</p>

                <p className="homens">Homens:</p>
                <span className="texto-destaque">
                    Peso Ideal (kg) = 50 + 2,3 kg &times; (altura - 60 polegadas (inches))
                </span>

                <p className="mulheres">Mulheres:</p>
                <span className="texto-destaque">
                    Peso Ideal (kg) = 45,5 + 2,3 kg &times; (altura - 60 polegadas (inches))
                </span>
                <p>Essa fórmula originalmente é baseada no sistema de medidas em polegadas (inches) e pés (ft).
                    Mas você consegue obter os resultados com sua altura em centímetros na calculadora acima.</p>
            </div>

            <div id="lorentz">
                <h4>O que é a Fórmula de Lorentz?</h4>
                <p>É uma fórmula simples que estima o peso corporal ideal subtraindo uma
                    determinada quantidade da altura criada pelo matemático Lorentz em 2009. Ela não leva em consideração outros fatores,
                    como a composição corporal, idade, sexo ou distribuição de gordura.
                </p>
                <p>Os valores padrão no final da fórmula são definidos 4 para homens e 2 para mulheres</p>
                <p>A fórmula de Lorentz é a seguinte:</p>
                <p className="homens">Homens:</p>
                <span className="texto-destaque">
                    Peso ideal (kg) = (altura - 100) - ((altura - 150) / 4)
                </span>
                <p className="mulheres">Mulheres:</p>
                <span className="texto-destaque">
                    Peso ideal (kg) = (altura - 100) - ((altura - 150) / 2)
                </span>
            </div>

            <br />
            <p className="pt-2.5">
                As fórmulas para calcular o peso ideal são apenas
                estimativas e os resultados podem variar de acordo com outros
                fatores individuais, como altura, composição corporal, nível de atividade física e histórico médico.
                Portanto, você também pode buscar orientação de profissionais de saúde, como médicos e nutricionistas,
                para determinar o quanto você precisa se pesar, assim como, adotar um estilo de vida saudável
                que seja adequado às suas necessidades específicas.
            </p>
            <br />

            <div className="fontes">
                <small className="referencias">Referências:</small>
                <a href="https://pubmed.ncbi.nlm.nih.gov/6869387/" target="_blank">
                    - J D Robinson, S M Lupkiewicz, L Palenik, L M Lopez, M Ariet,
                    <strong> Determination of ideal body weight for drug dosage calculations</strong>,
                    National Library of Medicine,
                    2016
                </a>
                <a href="https://pubmed.ncbi.nlm.nih.gov/10981254/" target="_blank">
                    -  M P Pai, F P Paloucek,
                    <strong> The origin of the "ideal" body weight equations </strong>,
                    National Library of Medicine,
                    2000
                </a>
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4841935/" target="_blank">
                    - Courtney M Peterson, Diana M Thomas, George L Blackburn, and Steven B Heymsfield,
                    <strong> Universal equation for estimating ideal body weight and body weight at any BMI</strong>,
                    National Library of Medicine,
                    2016
                </a>
                <a href="https://halls.md/ideal-weight-formulas-broca-devine/" target="_blank">
                    - Dr Halls,
                    <strong> Ideal weight formulas by Broca and Devine</strong>,
                    halls.md Moose & Doc,
                    2019
                </a>
                <a href="https://link.springer.com/article/10.1007/s11605-015-2910-4" target="_blank">
                    - Michael R. Kammerer, Michelle M. Porter, Alec C. Beekley & David S. Tichansky,
                    <strong> Ideal Body Weight Calculation in the Bariatric Surgical Population</strong>,
                    Springer Link,
                    2015
                </a>
                <a href="https://pt.wikipedia.org/wiki/F%C3%B3rmula_de_Lorentz" target="_blank">
                    - Fórmula de Lorentz,
                    Wikipépdia - A enciclópedia livre,
                    pt.wikipedia.org,
                    2022
                </a>
                <a href="https://doi.org/10.1007/978-3-211-89836-9_803" target="_blank">
                    - Nahler G.,
                    <strong> Lorentz-formula. In: Dictionary of Pharmaceutical Medicine</strong>,
                    Publisher:  Springer, Vienna,
                    2009</a>
                <a href="https://www.jobese.org/articles/formulas-for-determining-ideal-weight-and-its-relationship-to-the-body-mass-index-in-adults.pdf"
                    target="_blank">
                    - Gerardo Jose Bauce, Mary Zulay, Moya-Sifontes,
                    <strong> Formulas for Determining Ideal Weight and Its Relationship to the Body Mass Index in Adults</strong>,
                    Obese,
                    jobese.org,
                    2021
                </a>
                <a href="https://www.flaticon.com/br/" title="peso ícones" target="_blank">
                    - ícones criados por freepik - flaticon
                </a>
            </div>
        </section>
    )
}