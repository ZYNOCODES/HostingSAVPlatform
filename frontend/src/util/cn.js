export default function check(...classes){
    return classes.filter(Boolean).join(" ");
}

