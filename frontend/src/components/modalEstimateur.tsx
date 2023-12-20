"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormData {
    firstLastName: string;
    email: string;
    phone: string;
    societe: string;
    objet: string;
    message: string;
    consentement: boolean;
}

interface Props {
    estimateurData: {
        description: string;
        id: number;
        inclus: boolean;
        abonnement: boolean;
        price: number;
        title: string;
    }[];
    closeModal: () => void;
}

const ModalEstimateur: React.FC<Props> = ({ estimateurData, closeModal }) => {
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { push } = useRouter();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (formData: FormData) => {
        setSending(true);
        setError(null);


        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    formData
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(formData, estimateurData)
            // push("/contact-merci");
            reset();
        } catch (err) {
            setError("An error occurred while sending the email.");
        } finally {
            setSending(false);
        }
    };


    return (
        <div className="c-modal">
            <div className="c-modal_close" onClick={closeModal}>
                X
            </div>
            <h4 className="h4">
                Pour être recontacté,<br></br> merci de remplir le formulaire
            </h4>
            <form
                className="c-formulaire"
                id="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="c-formulaire_field">
                    <Controller
                        name="firstLastName"
                        defaultValue={""}
                        control={control}
                        rules={{
                            required: "Merci 'indiquer votre nom et prénom.",
                        }}
                        render={({ field }) => (
                            <>
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Nom et Prénom*"
                                />
                                {errors.firstLastName && (
                                    <span className="error">
                                        {errors.firstLastName.message}
                                    </span>
                                )}
                            </>
                        )}
                    />
                </div>
                <div className="c-formulaire_field">
                    <Controller
                        name="email"
                        defaultValue={""}
                        control={control}
                        rules={{
                            required: "Merci d'indiquer un email.",
                            pattern: {
                                value: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/,
                                message: "Email invalide",
                            },
                        }}
                        render={({ field }) => (
                            <>
                                <input
                                    {...field}
                                    type="email"
                                    placeholder="Email*"
                                />
                                {errors.email && (
                                    <span className="error">
                                        {errors.email.message}
                                    </span>
                                )}
                            </>
                        )}
                    />
                </div>
                <div className="c-formulaire_field">
                    <Controller
                        name="phone"
                        defaultValue={""}
                        control={control}
                        rules={{
                            required: "Merci d'indiquer votre numéro de téléphone.",
                            pattern: {
                                value: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/,
                                message: "Numéro de téléphone invalide",
                            },
                        }}
                        render={({ field }) => (
                            <>
                                <input
                                    {...field}
                                    type="tel"
                                    placeholder="Téléphone*"
                                />
                                {errors.phone && (
                                    <span className="error">
                                        {errors.phone.message}
                                    </span>
                                )}
                            </>
                        )}
                    />
                </div>
                <div className="c-formulaire_field">
                    <Controller
                        name="societe"
                        defaultValue={""}
                        control={control}
                        render={({ field }) => (
                            <>
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Société"
                                />
                            </>
                        )}
                    />
                </div>
                <div className="c-formulaire_field">
                    <Controller
                        name="message"
                        control={control}
                        defaultValue={""}
                        rules={{
                            required: "Merci de remplir votre message",
                        }}
                        render={({ field }) => (
                            <textarea {...field} rows={4} placeholder="Message" />
                        )}
                    />
                    {errors.message && (
                        <span className="error">{errors.message.message}</span>
                    )}
                </div>
                <div className="c-formulaire_field">
                    <div className="form-radio">
                        <Controller
                            name="consentement"
                            control={control}
                            rules={{
                                required:
                                    "Vous devez cocher cette case pour pouvoir soumettre le formulaire",
                            }}
                            defaultValue={false}
                            render={({ field }) => (
                                <>
                                    <input
                                        id="consentement"
                                        {...field}
                                        type="checkbox"
                                        value="Oui"
                                    />
                                    <label htmlFor="consentement">
                                        En soumettant ce formulaire, j&apos;accepte
                                        que les données transmises soient exploitées
                                        par Studio DoubleUp dans le cadre de ma
                                        prise de contact.
                                    </label>
                                </>
                            )}
                        />
                        {errors.consentement && (
                            <span className="error">
                                {errors.consentement.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className="c-formulaire_send">
                    <button type="submit" className="bouton">
                        Envoyer
                    </button>
                </div>
                {/* {sending || error || overlayModal ? (
                    <div
                        className="c-formulaire_overlay"
                        onClick={() => closeModal()}
                    >
                        {sending ? (
                            <div className="c-formulaire_overlay_text ">
                                <p>
                                    <span>Envoi en cours...</span>{" "}
                                    <span>
                                        Merci de patienter quelques instants
                                    </span>
                                </p>
                            </div>
                        ) : null}
                        {error ? (
                            <div className="c-formulaire_overlay_text">
                                <p>
                                    <span>Oups !</span>{" "}
                                    <span>
                                        Une erreur est survenue lors de l&apos;envoi
                                        de votre message.
                                    </span>
                                </p>
                            </div>
                        ) : null}
                    </div>
                ) : null} */}
            </form>
        </div>
    );
};

export default ModalEstimateur;