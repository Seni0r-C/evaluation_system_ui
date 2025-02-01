export const ensureFileExtension = (nameFile, fileExtension)=> {
    return nameFile?.includes(fileExtension) ? nameFile : `${nameFile}.${fileExtension}`;
}