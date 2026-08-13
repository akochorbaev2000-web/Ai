document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       МУЗЫКА
    ================================================== */

    const music =
        document.getElementById("weddingMusic");

    const musicButton =
        document.getElementById("musicButton");


    let musicStarted = false;


    function startMusic() {

        if (!music || musicStarted) {
            return;
        }

        music.volume = 0.45;

        const playPromise = music.play();

        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    musicStarted = true;

                    if (musicButton) {
                        musicButton.classList.add("playing");
                    }

                })
                .catch(() => {

                    /*
                     * Браузер заблокировал автоматический запуск.
                     * Следующее касание пользователя запустит музыку.
                     */

                });
        }
    }


    function userInteraction() {

        startMusic();

        document.removeEventListener(
            "touchstart",
            userInteraction
        );

        document.removeEventListener(
            "click",
            userInteraction
        );

        document.removeEventListener(
            "scroll",
            userInteraction
        );
    }


    /*
     * На iPhone музыка начинает играть
     * после первого действия пользователя.
     */

    document.addEventListener(
        "touchstart",
        userInteraction,
        {
            passive: true,
            once: true
        }
    );

    document.addEventListener(
        "click",
        userInteraction,
        {
            passive: true,
            once: true
        }
    );

    document.addEventListener(
        "scroll",
        userInteraction,
        {
            passive: true,
            once: true
        }
    );


    /* ==================================================
       КНОПКА МУЗЫКИ
    ================================================== */

    if (musicButton && music) {

        musicButton.addEventListener(
            "click",
            async () => {

                if (music.paused) {

                    try {

                        await music.play();

                        musicStarted = true;

                        musicButton.classList.add(
                            "playing"
                        );

                    } catch (error) {

                        console.log(
                            "Музыка не может быть запущена:",
                            error
                        );
                    }

                } else {

                    music.pause();

                    musicButton.classList.remove(
                        "playing"
                    );
                }
            }
        );
    }


    /* ==================================================
       COUNTDOWN
    ================================================== */

    const weddingDate =
        new Date(
            "2026-10-10T12:00:00+06:00"
        ).getTime();


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


        const now =
            Date.now();


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
                (
                    distance /
                    (1000 * 60 * 60)
                ) % 24
            );


        const m =
            Math.floor(
                (
                    distance /
                    (1000 * 60)
                ) % 60
            );


        const s =
            Math.floor(
                (
                    distance /
                    1000
                ) % 60
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

    setInterval(
        updateCountdown,
        1000
    );


    /* ==================================================
       КАРТА
    ================================================== */

    const mapButton =
        document.getElementById("mapButton");


    if (mapButton) {

        mapButton.addEventListener(
            "click",
            () => {

                const address =
                    encodeURIComponent(
                        "Кыргызстан, Чуйская область, Григорьевка, Ленин көчөсү 33"
                    );


                window.open(
                    "https://yandex.ru/maps/?text=" +
                    address,
                    "_blank"
                );

            }
        );
    }


    /* ==================================================
       ЛЕПЕСТКИ
    ================================================== */

    const petalsContainer =
        document.getElementById(
            "petalsContainer"
        );


    function createPetal() {

        if (!petalsContainer) {
            return;
        }


        const petal =
            document.createElement("span");


        const isSakura =
            Math.random() > 0.5;


        petal.className =
            isSakura
                ? "petal sakura"
                : "petal";


        const left =
            Math.random() * 100;


        const duration =
            7 +
            Math.random() * 8;


        const delay =
            Math.random() * 2;


        const size =
            0.65 +
            Math.random() * 0.8;


        const drift =
            (
                Math.random() * 180
                - 90
            ) + "px";


        petal.style.left =
            left + "%";


        petal.style.animationDuration =
            duration + "s";


        petal.style.animationDelay =
            delay + "s";


        petal.style.setProperty(
            "--drift",
            drift
        );


        petal.style.transform =
            "scale(" + size + ")";


        petalsContainer.appendChild(
            petal
        );


        setTimeout(
            () => {

                petal.remove();

            },
            (duration + delay) * 1000 + 500
        );
    }


    /*
     * Не создаём слишком много лепестков.
     * Это важно для iPhone.
     */

    let petalInterval =
        setInterval(
            createPetal,
            650
        );


    /*
     * Первые несколько лепестков сразу.
     */

    for (
        let i = 0;
        i < 5;
        i++
    ) {
        setTimeout(
            createPetal,
            i * 300
        );
    }


    /* ==================================================
       IMAGE LOADING
    ================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(
        (image) => {

            if (image.complete) {

                image.classList.add(
                    "loaded"
                );

            } else {

                image.addEventListener(
                    "load",
                    () => {

                        image.classList.add(
                            "loaded"
                        );

                    },
                    {
                        once: true
                    }
                );
            }
        }
    );


    /* ==================================================
       ОСТАНОВКА ЛЕПЕСТКОВ ПРИ СВЕРТКЕ СТРАНИЦЫ
    ================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                clearInterval(
                    petalInterval
                );

            } else {

                petalInterval =
                    setInterval(
                        createPetal,
                        650
                    );
            }
        }
    );

});
