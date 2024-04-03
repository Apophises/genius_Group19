function selectAvatar(avatarSrc) {
    alert("איזה כיף שבחרתם")
    // מסיר הדגשה מכל האווטארים
    document.querySelectorAll('.avatar').forEach(avatar => {
        avatar.classList.remove('avatar-selected');
    });

    // מוצא את האווטאר שנבחר ומוסיף לו הדגשה
    const selectedAvatar = Array.from(document.querySelectorAll('.avatar')).find(avatar => avatar.src.includes(avatarSrc));
    if (selectedAvatar) {
        selectedAvatar.classList.add('avatar-selected');
    }
}