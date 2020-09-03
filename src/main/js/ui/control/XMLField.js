Z8.define('org.zenframework.z8.template.controls.XMLField', {
    // Имя наследуемого класса
    extend: 'Z8.form.field.TextArea',
    cmInstance: null,

    completeRender() {
        Z8.form.field.TextArea.prototype.completeRender.call(this);

        let codeEditor = document.querySelector(`[name=${this.getId()}]`);
        // Создание редактора
        this.cmInstance = CodeMirror.fromTextArea(codeEditor, {
            mode: "text/html",
        });

        this.cmInstance.on("change", (ins) => {
            Z8.form.field.TextArea.prototype.setValue.call(this, ins.getValue(), "");
        });
    },

    setValue(value, displayValue) {
        Z8.form.field.TextArea.prototype.setValue.call(this, value, displayValue);

        if(this.cmInstance) {
            this.cmInstance.setValue(value);
        }
    }
});