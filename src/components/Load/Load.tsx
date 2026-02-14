import TelegramModule from "../../hooks/useTelegram";
import "./style.scss";

export const Load = () => {
  function openLink() {
    TelegramModule.useLink("https://t.me/NoxstellaBot");
  }

  return (
    <div className="load-page">
      {/* <div className="loader"></div> */}
      <div className="info">
        <div className="image">
          <img src="/pages/avatar.png" alt="avatar" />
        </div>
        <div className="text">
          <h4>Мы переехали!</h4>
        </div>
        <div className="descr">
          <p>Перейди в нашего нового бота Noxstella.</p>
        </div>
        <div className="button">
          <button onClick={openLink}>
            <h4>Перейти в бота</h4>
          </button>
          <div className="stars">
            {Array.from({ length: 88 }).map((_, i) => (
              <span key={i} className="star" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};