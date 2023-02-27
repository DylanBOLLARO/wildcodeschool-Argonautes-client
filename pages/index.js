import Layout from "@/components/Layout";
import { useToast } from "@chakra-ui/react";
import { MdOutlineClose } from "react-icons/md";
import React, { useEffect, useState } from "react";
const axios = require("axios").default;

const index = () => {
  const toast = useToast();
  const [argonautes, setArgonautes] = useState([]);

  // Récupération de tous les argonautes présents dans la base de données.
  useEffect(() => {
    axios.get("http://localhost:8080/").then(function (response) {
      setArgonautes(response.data);
    });
  }, [argonautes]);

  // Créer un pop-up avec la library Chakra-ui.
  function popup(type, nameArgonaute, textArgonaute) {
    toast({
      title: `L'argonaute ` + nameArgonaute + textArgonaute,
      status: type,
      duration: 2000,
      isClosable: true,
    });
  }

  // Envoie le formulaire pour l'ajout de l'argonaute sur la liste, si l'argonaute existe déjà rien sinon on l'ajoute, renvoi un pop-up dans tous les cas. On se base sur la réponse reçut du backend.
  function createArgonaute(params) {
    axios
      .post("http://localhost:8080/", {
        name: params,
      })
      .then(function (response) {
        if (response.data.err === "AlreadyExiste") {
          popup(
            "error",
            response.data.name,
            " fait déjà partie de l'expédition"
          );
        } else {
          popup(
            "info",
            response.data.name,
            " fait maintenant partie de l'expédition"
          );
        }
      });
  }

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col p-2 gap-3">
          <h2 className="text-xl text-center font-bold">
            Ajouter un(e) Argonaute
          </h2>

          <form
            className="flex flex-row gap-3 justify-center items-center"
            onSubmit={(e) => {
              e.preventDefault();
              createArgonaute(e.target[0].value);
              e.target[0].value = "";
            }}
          >
            <input
              type="text"
              placeholder="Entrer le nom de votre Argonaute"
              className="w-96 rounded-full p-2 pl-5 outline-none border-2 border-[#f76c6c]"
            />
            <button
              type="submit"
              className="bg-[#f76c6c] hover:scale-110 duration-75 py-2 px-5 rounded-full text-white font-poppins font-bold"
            >
              Envoyer
            </button>
          </form>
        </div>
        <div className="flex flex-col p-2 gap-3">
          <h2 className="text-xl text-center font-bold">
            Membres de l'équipage
          </h2>
          <div className="grid grid-cols-3 gap-3">
            // Affiche tous les argonautes de la liste.
            {argonautes.map((argonaute) => (
              <div key={argonaute._id} className="flex justify-center">
                <div className="flex flex-row py-1 px-4 border-2 border-black/10 rounded-full hover:scale-110 duration-75 hover:border-[#f76c6c]  w-40 justify-between items-center">
                  {argonaute.name}
                  <MdOutlineClose
                    className="hover:text-[#f76c6c] cursor-pointer text-black/10 hover:scale-150 duration-100 border-[1px] rounded-full border-black/10 hover:border-[#f76c6c]"
                    size={16}
                    onClick={() => {
                      // Supprime l'argonaute via son ID. Affiche pop-up de suppression
                      axios.delete(`http://localhost:8080/${argonaute._id}`);
                      popup(
                        "warning",
                        argonaute.name,
                        " ne fait plus partie de l'expédition"
                      );
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default index;
