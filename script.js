document.addEventListener("DOMContentLoaded", () => {


    /* ==================================================
       ELEMENTS
    ================================================== */

    const letterScreen =
        document.getElementById("letterScreen");

    const letter =
        document.querySelector(".letter");

    const openLetter =
        document.getElementById("openLetter");

    const music =
        document.getElementById("weddingMusic");

    const musicControl =
        document.getElementById("musicControl");

    const petalsContainer =
        document.getElementById("petalsContainer");


    /* ==================================================
       MUSIC STATE
    ================================================== */

    let musicStarted = false;


    /* ==================================================
       START MUSIC
    ================================================== */

    function startMusic() {

        if (!music) {

            console.warn(
                "Музыка не найдена: #weddingMusic"
            );

            return;
        }


        music.volume = 0.65;


        const playPromise =
            music.play();


        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    musicStarted = true;

                    updateMusicButton();

                    console.log(
                        "Музыка успешно запущена"
                    );

                })
                .catch((error) => {

                    console.warn(
                        "Браузер заблокировал музыку:",
                        error
                    );

                });

        }

    }


    /* ==================================================
       MUSIC BUTTON
    ================================================== */

    function updateMusicButton() {

        if (!musicControl || !music) {
            return;
        }


        if (!music.paused) {

            musicControl.classList.add(
                "playing"
            );

        } else {

            musicControl.classList.remove(
                "playing"
            );

        }

    }


    if (musicControl) {

        musicControl.addEventListener(
            "click",
            () => {

                if (!music) {
                    return;
                }


                if (music.paused) {

                    music.play()
                        .then(() => {

                            musicStarted = true;

                            updateMusicButton();

                        })
                        .catch((error) => {

                            console.warn(
                                "Не удалось включить музыку:",
                                error
                            );

                        });

                } else {

                    music.pause();

                    updateMusicButton();

                }

            }
        );

    }


    /* ==================================================
       ОТКРЫТИЕ ПРИГЛАШЕНИЯ
    ================================================== */

    if (
        letterScreen &&
        letter &&
        openLetter
    ) {

        openLetter.addEventListener(
            "click",
            () => {

                if (
                    letter.classList.contains(
                        "opened"
                    )
                ) {

                    return;

                }


                /*
                 * Очень важно:
                 *
                 * play() вызывается непосредственно
                 * после действия пользователя.
                 *
                 * Поэтому iPhone / Safari /
                 * Chrome разрешают запуск.
                 */

                startMusic();


                /* Переворот */

                letter.classList.add(
                    "opened"
                );

                document.body.classList.add(
                    "letter-open"
                );


                /* После анимации закрываем экран */

                setTimeout(() => {

                    letterScreen.classList.add(
                        "hidden"
                    );

                    document.body.classList.remove(
                        "letter-open"
                    );


                    window.scrollTo({
                        top: 0,
                        behavior: "instant"
                    });


                    /*
                     * Показываем кнопку музыки
                     */

                    if (musicControl) {

                        musicControl.classList.add(
                            "visible"
                        );

                    }

                }, 1800);

            }
        );

    }


    /* ==================================================
       COUNTDOWN
    ================================================== */

    const weddingDate =
        new Date(
            "2026-10-16T12:00:00+06:00"
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
            String(d).padStart(
                2,
                "0"
            );


        hours.textContent =
            String(h).padStart(
                2,
                "0"
            );


        minutes.textContent =
            String(m).padStart(
                2,
                "0"
            );


        seconds.textContent =
            String(s).padStart(
                2,
                "0"
            );

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* ==================================================
       MAP
    ================================================== */

    const mapButton =
        document.getElementById(
            "mapButton"
        );


    if (mapButton) {

        mapButton.addEventListener(
            "click",
            () => {

                const address =
                    encodeURIComponent(
                        "Григорьевка айылы, Ленин көчөсү, 33-үй"
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
       PETALS
    ================================================== */

    function createPetal() {

        if (!petalsContainer) {
            return;
        }


        const petal =
            document.createElement(
                "span"
            );


        const isSakura =
            Math.random() > .5;


        petal.classList.add(
            "petal"
        );


        if (isSakura) {

            petal.classList.add(
                "sakura"
            );

        } else {

            petal.classList.add(
                "rose"
            );

        }


        const startLeft =
            Math.random() * 100;


        const drift =
            (
                Math.random() * 220
                - 110
            );


        const rotation =
            (
                Math.random() * 720
                - 360
            );


        const duration =
            7 +
            Math.random() * 8;


        const delay =
            Math.random() * 2;


        const size =
            .65 +
            Math.random() * .75;


        petal.style.left =
            startLeft + "%";


        petal.style.setProperty(
            "--drift",
            drift + "px"
        );


        petal.style.setProperty(
            "--rotation",
            rotation + "deg"
        );


        petal.style.width =
            (
                9 * size
            ) + "px";


        petal.style.height =
            (
                14 * size
            ) + "px";


        petal.style.animationDuration =
            duration + "s";


        petal.style.animationDelay =
            delay + "s";


        petalsContainer.appendChild(
            petal
        );


        setTimeout(() => {

            petal.remove();

        }, (duration + delay) * 1000 + 500);

    }


    /* ==================================================
       PETAL LOOP
    ================================================== */

    let petalInterval =
        null;


    function startPetals() {

        if (petalInterval) {
            return;
        }


        /*
         * Сразу создаём несколько,
         * чтобы эффект был виден.
         */

        for (
            let i = 0;
            i < 10;
            i++
        ) {

            setTimeout(
                createPetal,
                i * 250
            );

        }


        petalInterval =
            setInterval(
                createPetal,
                500
            );

    }


    startPetals();


    /* ==================================================
       IMAGE LOADING
    ================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


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

                    }
                );

            }

        }
    );


    /* ==================================================
       MUSIC EVENTS
    ================================================== */

    if (music) {

        music.addEventListener(
            "play",
            () => {

                musicStarted = true;

                updateMusicButton();

            }
        );


        music.addEventListener(
            "pause",
            () => {

                updateMusicButton();

            }
        );

    }


});
