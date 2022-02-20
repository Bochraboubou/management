import { Entreprise } from "./Entreprise";

export interface Organisation{
    id: number;
    nom:string;
    mail: string;
    adresse: string;
    tel: number;
    m_d_oeuvre: string;
    m_d_oeuvrage: string;
    listentreprises:Array<Entreprise>;
}