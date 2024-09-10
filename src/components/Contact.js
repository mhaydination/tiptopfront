import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css"; // Assurez-vous que les classes CSS sont définies ici

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: "",
    type: "",
  });

  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });

    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
    }, 5000);
  };

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    try {
      setDisabled(true);

      // Simulez l'envoi de l'email ici

      toggleAlert("Votre message a été envoyé avec succès !", "success");
    } catch (e) {
      console.error(e);
      toggleAlert("Une erreur est survenue. Veuillez réessayer.", "danger");
    } finally {
      setDisabled(false);
      reset();
    }
  };

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="content">
          <div className="form">
            <h1 className="tab-content">Contactez-nous</h1>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="field-wrap">
                <label className={`req ${errors.name ? "highlight" : ""}`}>
                  Nom complet<span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: "Nom complet requis" })}
                  className={`${errors.name ? "error-msg active" : ""}`}
                />
                {errors.name && (
                  <div className="error-msg active">{errors.name.message}</div>
                )}
              </div>

              <div className="field-wrap">
                <label className={`req ${errors.email ? "highlight" : ""}`}>
                  Email<span className="req">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", {
                    required: "Email requis",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Email invalide",
                    },
                  })}
                  className={`${errors.email ? "error-msg active" : ""}`}
                />
                {errors.email && (
                  <div className="error-msg active">{errors.email.message}</div>
                )}
              </div>

              <div className="field-wrap">
                <label className={`req ${errors.subject ? "highlight" : ""}`}>
                  Sujet<span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  {...register("subject", {
                    required: "Sujet requis",
                  })}
                  className={`${errors.subject ? "error-msg active" : ""}`}
                />
                {errors.subject && (
                  <div className="error-msg active">
                    {errors.subject.message}
                  </div>
                )}
              </div>

              <div className="field-wrap">
                <label className={`req ${errors.message ? "highlight" : ""}`}>
                  Message<span className="req">*</span>
                </label>
                <textarea
                  name="message"
                  {...register("message", {
                    required: "Message requis",
                  })}
                  className={`${errors.message ? "error-msg active" : ""}`}
                ></textarea>
                {errors.message && (
                  <div className="error-msg active">
                    {errors.message.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="button button-block"
                disabled={disabled}
              >
                Envoyer
              </button>
            </form>
            {alertInfo.display && (
              <div className={`error-msg active alert-${alertInfo.type}`}>
                {alertInfo.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
