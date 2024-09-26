IpToHash = (ip) => {

    let hash = 0;

    if (ip.length == 0) return hash;

    for (i = 0; i < ip.length; i++) {
        char = ip.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    return hash;
}
module.exports = IpToHash