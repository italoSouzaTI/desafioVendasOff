export function formatarData(valor: string) {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Limita o número de caracteres para no máximo 8
    if (valor.length > 8) {
        valor = valor.slice(0, 8);
    }

    // Formatação da data conforme o número de caracteres
    if (valor.length <= 2) {
        valor = valor.replace(/(\d{2})/, "$1");
    } else if (valor.length <= 4) {
        valor = valor.replace(/(\d{2})(\d{2})/, "$1/$2");
    } else {
        valor = valor.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    }

    return valor;
}
export function formatDateGenerate(date: Date) {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // para usar o formato de 24 horas
    }).format(date);
}
