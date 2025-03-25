export const updateMailState = (mails, id, field) => {
    if (field === "read") {
        return mails.map((mail) =>
            mail.id === id ? { ...mail, read: true } : { ...mail }
        );
    }
    return mails.map((mail) =>
        mail.id === id ? { ...mail, [field]: !mail[field] } : { ...mail }
    );
};

export const filterMails = (mails, filterType) => {
    switch (filterType) {
        case "Read":
            return mails.filter((mail) => mail.read);
        case "Unread":
            return mails.filter((mail) => !mail.read);
        case "Favorites":
            return mails.filter((mail) => mail.favorite);
        default:
            return mails;
    }
};
