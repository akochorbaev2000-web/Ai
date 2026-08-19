document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       МУЗЫКА
    ================================================== */

    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("musicButton");

    let musicStarted = false;

    if (music) {

        music.volume = 0.45;


        /*
         * Попытка автоматического запуска
         */
        const tryStartMusic = () => {

            if (musicStarted) return;

            music.play()
                .then(() => {

                    musicStarted = true;

                    if (musicButton) {
                        musicButton.classList.add("playing");
                    }

                })
                .catch(() => {
                    /*
                     * Autoplay заблокирован браузером.
                     */
                });
        };


        tryStartMusic();


        /*
         * Первый клик пользователя
         */
        const startMusicFromUser = () => {

            if (musicStarted) return;

            music.play()
                .then(() => {

                    musicStarted = true;

                    if (musicButton) {
                        musicButton.classList.add("playing");
                    }

                })
                .catch(() => {});

        };


        document.addEventListener(
            "click",
            startMusicFromUser,
            { once: true }
        );

        document.addEventListener(
            "touchstart",
            startMusicFromUser,
            { once: true, passive: true }
        );


        /*
         * Кнопка музыки
         */
        if (musicButton) {

            musicButton.addEventListener("click", (event) => {

                event.stopPropagation();

                if (music.paused) {

                    music.play()
                        .then(() => {

                            musicStarted = true;

                            musicButton.classList.add("playing");

                        })
                        .catch(() => {});

                } else {

                    music.pause();

                    musicButton.classList.remove("playing");
                }

            });

        }
    }


    /* ==================================================
       ОБРАТНЫЙ ОТСЧЁТ
    ================================================== */

    const weddingDate =
        new Date("2026-10-10T12:00:00+06:00").getTime();

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
       КАРТА
    ================================================== */

    const mapButton =
        document.getElementById("mapButton");


    if (mapButton) {

        mapButton.addEventListener("click", () => {

            window.open(
                "https://yandex.ru/maps/?text=Кыргызстан%2C%20Григорьевка%2C%20Ленин%20көчөсү%2033",
                "_blank"
            );

        });

    }


    /* ==================================================
       ЛЕПЕСТКИ
    ================================================== */

    const petalsContainer =
        document.getElementById("petalsContainer");


    if (petalsContainer) {

        const petalCount = 28;

        for (let i = 0; i < petalCount; i++) {

            const petal =
                document.createElement("span");

            petal.className =
                i % 2 === 0
                    ? "petal rose-petal"
                    : "petal sakura-petal";


            petal.style.left =
                Math.random() * 100 + "%";


            petal.style.animationDelay =
                Math.random() * 8 + "s";


            petal.style.animationDuration =
                (7 + Math.random() * 7) + "s";


            petal.style.setProperty(
                "--drift",
                (-80 + Math.random() * 160) + "px"
            );


            petal.style.setProperty(
                "--rotate",
                (180 + Math.random() * 360) + "deg"
            );


            petal.style.transform =
                `rotate(${Math.random() * 360}deg)`;


            petalsContainer.appendChild(petal);
        }
    }


    /* ==================================================
       ИЗОБРАЖЕНИЯ
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
