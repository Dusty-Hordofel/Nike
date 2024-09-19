import { Input } from "@/components/ui/input";

const FileInput = ({
  handleFileChange,
  fileInputRef,
  previewUrl,
  disabled,
  field,
}: any) => (
  <div className="">
    <Input
      type="file"
      accept=".jpeg, .png"
      onChange={(e) => {
        handleFileChange(e.target.files);
        field.onChange(e.target.files);
      }}
      ref={fileInputRef}
      disabled={disabled}
    />
    {previewUrl && (
      <img
        src={previewUrl}
        alt="Prévisualisation"
        className="mt-4 max-w-xs rounded-lg shadow-md"
      />
    )}
  </div>
);

export default FileInput;

{
  /* <div className="">
                      <Input
                        type="file"
                        accept=".jpeg, .png"
                        onChange={(e) => {
                          handleFileChange(e.target.files);
                          field.onChange(e.target.files);
                        }}
                        name={field.name} // Ensure name is set for correct field
                        // disabled={status === "loading"}
                        ref={fileInputRef}
                      />
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="Prévisualisation"
                          className={`mt-4 max-w-xs rounded-lg shadow-md ${
                            status === "loading" ? "opacity-65" : "opacity-100"
                          }`}
                        />
                      )}
                    </div> */
}
