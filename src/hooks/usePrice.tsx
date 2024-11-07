export function price(value: number) {
    // Remover todos os caracteres não numéricos (exceto o ponto)
    let numericValue = value.replace(/\D/g, "");

    // Verificar se a string não está vazia
    if (numericValue === "") return "";

    // Converter para número e formatar como moeda
    const numberValue = parseInt(numericValue, 10) / 100;

    // Retornar o valor formatado como moeda
    return numberValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
