// const ImageUpload = ({ fieldName, multiple = true, index }) => {
//     // ... (le reste du code)

//     return (
//       <div>
//         <div {...getRootProps()} className={`border-2 border-dashed p-4 text-center ${isDragActive ? 'border-primary' : 'border-gray-300'}`}>
//           <input {...getInputProps()} />
//           {
//             isDragActive ?
//               <p>Déposez les images ici ...</p> :
//               <p>Glissez et déposez des images ici, ou cliquez pour sélectionner des fichiers</p>
//           }
//         </div>
//         <Input
//           type="file"
//           accept="image/*"
//           multiple={multiple}
//           onChange={(e) => {
//             if (e.target.files) {
//               handleFiles(Array.from(e.target.files));
//             }
//           }}
//           className="mt-2"
//         />
//         {/* ... (prévisualisation des images) */}
//       </div>
//     );
//   };

//   <div>
//   <Label>Images du produit</Label>
//   <ImageUpload fieldName={`subProducts.${subProductIndex}.images`} multiple={true} index={subProductIndex} />
// </div>
// <div>
//   <Label>Images de description</Label>
//   <ImageUpload fieldName={`subProducts.${subProductIndex}.description_images`} multiple={true} index={subProductIndex} />
// </div>
