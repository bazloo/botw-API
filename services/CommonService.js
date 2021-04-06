class CommonService {
    async run(params) {
        return this.validate(params).then((correctData) => {
            return this.generate(correctData);
        });
    }
}
module.exports = CommonService;
