Z8.define('org.zenframework.z8.template.controls.MusicField', {
    // Имя наследуемого класса
    extend: 'Z8.form.field.File',
    playing: false,
    supportedFormats: ["mp3", "ogg", "wav"],

    htmlMarkup() {
        let triggers = this.triggers;
        triggers.push({ icon: 'fa-play', tooltip: 'Прослушать', handler: this.play, scope: this });
        let markup = Z8.form.field.File.prototype.htmlMarkup.call(this);

        let player = {
            tag: "audio",
            cls: "audio__player"
        };

        markup.cn.push(player);
        return markup;
    },

    play() {
        if(this.isValid()) {
            let player = document.querySelector(`#${this.getId()} .audio__player`),
                trigger = this.getPlayTrigger();

            if(!this.playing) {
                player.play().then(()=>{
                    this.playing = true;
                    trigger.icon.classList.remove("fa-play");
                    trigger.icon.classList.add("fa-pause");
                });
            } else {
                player.pause();
                this.playing = false;
                trigger.icon.classList.add("fa-play");
                trigger.icon.classList.remove("fa-pause");
            }
        }
    },

    getPlayTrigger() {
        return this.triggers[0];
    },

    // completeRender() {
    //     Z8.form.field.TextArea.prototype.completeRender.call(this);
    //
    //     let codeEditor = document.querySelector(`[name=${this.getId()}]`);
    //
    //     // Создание редактора
    //     this.cmInstance = CodeMirror.fromTextArea(codeEditor, {
    //         lineNumbers: true,
    //         mode: "text/html",
    //     });
    //
    //     this.cmInstance.on("change", (ins) => {
    //         console.log(ins.getValue());
    //         Z8.form.field.TextArea.prototype.setValue.call(this, ins.getValue(), "");
    //     });
    // },
    //
    setValue(value, displayValue) {
        //Вставка плеера
        Z8.form.field.Text.prototype.setValue.call(this, value, displayValue);

        let player = document.querySelector(`#${this.getId()} .audio__player`);

        if(player) {
            if(this.isValid()) {
                // Установка источника
                player.src = encodeURI((window._DEBUG_ ? '/' : '') + value[0].path.replace(/\\/g, '/')) + '?&session=' + Application.session +
                    (value[0].id != null ? '&id=' + value[0].id : '');
            } else {
                // Если значение поменялось на невалидное
                this.playing = false;
                trigger.icon.classList.add("fa-play");
                trigger.icon.classList.remove("fa-pause");
                player.src = "";
            }
        }
    },

    validate() {
        let res = false;
        let value = this.getValue();

        if (value) {
            value = value[0].name.split(".");

            if(this.supportedFormats.includes(value[value.length-1].toLowerCase())) {
                res = true;
            }
        }

        this.setValid(res);
    }
});