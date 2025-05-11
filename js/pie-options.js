export const pies = [
    { id: 1, name: "Classic Apple Pie", price: 12.95, image: "./img/pie-1.png" },
    { id: 2, name: "Pumpkin Pie", price: 12.95, image: "./img/pie-2.png" },
    { id: 3, name: "Pecan Pie", price: 12.95, image: "./img/pie-3.png" }
];


function logSizeSelection(pieId) {
    const selectedSize = document.getElementById(`size-${pieId}`).value;
    console.log(`Pie ID ${pieId} selected size: ${selectedSize}`);
}
  