class TokenDto {
    username;
    email;
    id;
    isActivated;

    constructor({username,email,_id,isActivated}){
        this.username = username;
        this.email = email;
        this.id = _id;
        this.isActivated = isActivated;
    }
}

module.exports = TokenDto;