function markAsFavorite(pieName) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(pieName)) {
      favorites.push(pieName);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${pieName} marked as favorite!`);
    } else {
      alert(`${pieName} is already in your favorites.`);
    }
}
  