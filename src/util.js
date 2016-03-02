export function dasherize(text) {
    return text.replace(/(\b|[a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
