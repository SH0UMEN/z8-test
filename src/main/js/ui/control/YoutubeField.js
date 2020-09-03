Z8.define('org.zenframework.z8.template.controls.YoutubeField', {
    // Имя наследуемого класса
    extend: 'Z8.form.field.Text',

    htmlMarkup() {
        let markup = Z8.form.field.Text.prototype.htmlMarkup.call(this);
        markup.cls += " youtube";
        markup.cn[1].cn.push({
            tag: "div",
            cls: "youtube__wrapper"
        });
        return markup;
    },

    setValue(value, displayValue) {
        let playerWrapper = document.querySelector("#" + this.getId() + " .youtube__wrapper");
        //Вставка плеера
        Z8.form.field.Text.prototype.setValue.call(this, value, displayValue);
        if(this.isValid() && this.input && (this.prevValue != value || playerWrapper.innerHTML == "")) {
            let url = new URL(value),
                player = `<iframe height="315" src="https://www.youtube.com/embed/${ url.searchParams.get('v') }" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            playerWrapper.innerHTML = player;
        } else if(!this.isValid() && this.input) {
            playerWrapper.innerHTML = "";
        }

        this.prevValue = value;
    },

    onInput(e, target) {
        this.prevValue = target.title;
        Z8.form.field.Text.prototype.onInput.call(this, e, target);
    },

    validate() {
        let value = this.getValue(),
            res = false,
            url;

        try {
            url = new URL(value);
        } catch(e) {
            res = false;
            this.setValid(res);
            return;
        }

        if(url.hostname == "youtube.com" || url.hostname == "www.youtube.com") {
            res = true;
        }

        this.setValid(res);
    }
});