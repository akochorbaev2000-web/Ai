document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       LETTER OPENING
    ================================================== */

    const letterScreen =
        document.getElementById("letterScreen");

    const letter =
        document.querySelector(".letter");

    const openLetter =
        document.getElementById("openLetter");


    if (letterScreen && letter && openLetter) {

        openLetter.addEventListener("click", () => {

            if (letter.classList.contains("opened")) {
                return;
            }


            /* запускаем переворот */

            letter.classList.add("opened");

            document.body.classList.add("letter-open");


            /*
             * После завершения переворота
             * закрываем стартовый экран.
             */

            setTimeout(() => {

                letterScreen.classList.add("hidden");

                document.body.classList.remove("letter-open");

                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });

            }, 1800);

        });

    }


    /* ==================================================
       COUNTDOWN
    ================================================== */

    const weddingDate =
        new Date("2026-10-16T16:00:00+06:00").getTime();


    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    function updateCountdown() {

        if (
            !days ||
            !hours ||
            !minutes ||
            !seconds
        ) {
            return;
        }


        const now = Date.now();

        const distance =
            weddingDate - now;


        if (distance <= 0) {

            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            return;
        }


        const d =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const h =
            Math.floor(
                (distance /
                    (1000 * 60 * 60)) % 24
            );


        const m =
            Math.floor(
                (distance /
                    (1000 * 60)) % 60
            );


        const s =
            Math.floor(
                (distance / 1000) % 60
            );


        days.textContent =
            String(d).padStart(2, "0");

        hours.textContent =
            String(h).padStart(2, "0");

        minutes.textContent =
            String(m).padStart(2, "0");

        seconds.textContent =
            String(s).padStart(2, "0");
    }


    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* ==================================================
       MAP
    ================================================== */

    const mapButton =
        document.getElementById("mapButton");


    if (mapButton) {

        mapButton.addEventListener("click", () => {

            window.open(
                "https://yandex.ru/maps/",
                "_blank"
            );

        });

    }


    /* ==================================================
       IMAGE LOADING
    ================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach((image) => {

        if (image.complete) {

            image.classList.add("loaded");

        } else {

            image.addEventListener(
                "load",
                () => {
                    image.classList.add("loaded");
                }
            );

        }

    });

});
