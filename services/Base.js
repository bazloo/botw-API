class Base {
    async run(params) {
        return this.validate(params).then((correctData) => {
            return this.execute(correctData);
        });
    }
}
module.exports = Base;
