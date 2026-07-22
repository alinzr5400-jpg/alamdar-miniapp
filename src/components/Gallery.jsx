import NFTCard from "./NFTCard";

const sampleCards = [
  { id: 1, name: "نمونه کارت ۱", role: "افسانه‌ای", rarity: "Legendary" },
  { id: 2, name: "نمونه کارت ۲", role: "افسانه‌ای", rarity: "Legendary" },
  { id: 3, name: "نمونه کارت ۳", role: "اسطوره‌ای", rarity: "Mythical" },
  { id: 4, name: "نمونه کارت ۴", role: "اسطوره‌ای", rarity: "Mythical" },
  { id: 5, name: "نمونه کارت ۵", role: "منحصربه‌فرد", rarity: "Unique" },
  { id: 6, name: "نمونه کارت ۶", role: "منحصربه‌فرد", rarity: "Unique" },
];

function Gallery() {
  return (
    <section className="glass gallery">
      <div className="gallery-head">
        <div>
          <h3>گالری کارت‌ها</h3>
          <p>فعلاً نمونه‌های اولیه برای چیدمان صفحه. بعداً دیتا کامل ۱۱۴ شخصیت وارد می‌شود.</p>
        </div>

        <span className="badge">Locked Gallery</span>
      </div>

      <div className="grid">
        {sampleCards.map((card) => (
          <NFTCard
            key={card.id}
            id={card.id}
            name={card.name}
            role={card.role}
            rarity={card.rarity}
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;