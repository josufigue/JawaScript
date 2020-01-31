export interface rankingTask {
    Id?: string;
    Izena: string;
    Puntuazioa: number;
    erabiltzaileId: string;
    jokatuta: string;
    azkenengoPartida: Array<string>;
}
export interface gald {
    id?: string;
    Erantzun1: string;
    Erantzun2: string;
    ErantzunZuzena: string;
    Galdera: string;
    Irudia: string;
}
export interface taldea{
    izena?: string;
    sortzailea: string;
}