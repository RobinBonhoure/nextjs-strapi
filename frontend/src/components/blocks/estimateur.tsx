'use client'

import { useState } from 'react';
import ModalEstimateur from '../modalEstimateur';

interface SubItemsProps {
    title: string;
    price: number;
    description: string;
    inclus: boolean;
    abonnement: boolean;
    id: number;
};

interface ItemsProps {
    title: string;
    subtitle: string;
    items: SubItemsProps[];
}

interface Props {
    data: {
        title: string;
        subtitle: string;
        items: ItemsProps[];
    }
    estimateurData: [];
}

const Estimateur: React.FC<Props> = ({ data }) => {

    const initialSubitems = data.items[0].filter(subitem => subitem.inclus);

    console.log()

    const [selectedSubitems, setSelectedSubitems] = useState<SubItemsProps[]>([]);
    const [isModalVisible, setModalVisibility] = useState(false);

    const handleSubitemClick = (subitem: SubItemsProps) => {
        if (subitem.inclus) return

        const isSelected = selectedSubitems.some((selected) => selected.title === subitem.title);

        if (isSelected) {
            // Remove the subitem if it's already selected
            setSelectedSubitems((prevSelected) => prevSelected.filter((selected) => selected.title !== subitem.title));
        } else {
            // Add the subitem if it's not selected
            setSelectedSubitems((prevSelected) => [...prevSelected, subitem]);
        }
    };


    const handleLaunchClick = () => {
        // Show the modal when "Je me lance" is clicked
        setModalVisibility(true);
    };

    const calculatePrices = () => {
        const fixe = selectedSubitems.reduce((total, subitem) => {
            // Add the price only if subitem.abonnement is false
            if (!subitem.abonnement) {
                total += subitem.price || 0;
            }
            return total;
        }, 500); // Starting with a default value of 500, as in your original code

        const abonnement = selectedSubitems.reduce((total, subitem) => {
            // Add the price only if subitem.abonnement is true
            if (subitem.abonnement) {
                total += subitem.price || 0;
            }
            return total;
        }, 15); // Starting with a default value of 0 for abonnement calculation

        return { fixe, abonnement };
    };


    const closeModal = () => {
        setModalVisibility(false);
    }

    return (
        <>
            <section className="blocks-estimateur">
                <hgroup>
                    <h2>{data.title}</h2>
                    <h3>{data.subtitle}</h3>
                </hgroup>
                <div className="blocks-estimateur__content">
                    {data.items.map((item, index) => (
                        <article key={index} className="item">
                            <h4 className="item-title">{item.title}</h4>
                            <p className="item-subtitle">{item.subtitle}</p>
                            <div className="subitems">
                                {item.items.map((subitem, index) => (
                                    <div
                                        key={index}
                                        className={`subitem ${subitem.inclus ? 'inclus' : (selectedSubitems.some((selected) => selected.title === subitem.title) ? 'active' : '')}`}
                                        data-price={subitem.price}
                                        onClick={() => handleSubitemClick(subitem)}
                                    >
                                        <h4 className="subitem-title">{subitem.title}</h4>
                                        {subitem.price && <p className="subitem-price">à partir de {subitem.price}€{subitem.abonnement && '/mois'}</p>}
                                        {subitem.description && <div className="subitem-description"><div className="subitem-description_button">?</div>
                                            <div className="subitem-description_text">{subitem.description}</div></div>}
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
                <section className="blocks-cta">
                    <div className='blocks-cta_wrapper'>
                        <div className="blocks-cta__content">
                            <figure>
                                {/* <Media data={data.image} /> */}
                            </figure>
                            <div className="text">
                                <h2 className='title'>Estimation à partir de {calculatePrices().fixe}€</h2>
                                <p>possibilité de payer en plusieurs fois</p>
                                <h3 className='subtitle'>+abonnement de {calculatePrices().abonnement}€/mois</h3>
                            </div>
                            <div className='bouton' onClick={handleLaunchClick}>
                                Je me lance
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            {isModalVisible && <ModalEstimateur estimateurData={selectedSubitems} closeModal={closeModal} />}
        </>
    );
}

export default Estimateur;