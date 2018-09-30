//打开导入语料弹框
export const SHOW_CORPUS_MODAL = Symbol("SHOW_CORPUS_MODAL");
export function showCorpusModal(){
    return {
        type: SHOW_CORPUS_MODAL
    }
}
//关闭导入语料弹框
export const HIDE_CORPUS_MODAL = Symbol("HIDE_CORPUS_MODAL");
export function hideCorpusModal(){
    return{
        type:HIDE_CORPUS_MODAL
    }
}
//打开登录弹框
export const SHOW_LOGIN_MODAL = Symbol("SHOW_LOGIN_MODAL");
export function showLoginModal(){
    return{
        type: SHOW_LOGIN_MODAL
    }
}
//关闭登录弹框
export const HIDE_LOGIN_MODAL = Symbol("HIDE_LOGIN_MODAL");
export function hideLoginModal(){
    return{
        type: HIDE_LOGIN_MODAL
    }
}
