"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formater";
import { useActionState, useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormStatus } from "react-dom";
import { Product } from "../../../../../generated/prisma/client";
import Image from "next/image";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

export function ProductForm({ product }: { product?: Product | null }) {
  const [priceInCents, setPriceInCents] = useState<number>(
    product?.priceInCents || 0,
  );
  const [fileUrl, setFileUrl] = useState<string>(product?.filePath || "");
  const [imageUrl, setImageUrl] = useState<string>(product?.imagePath || "");

  const [error, formAction] = useActionState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {},
  );

  return (
    <form action={formAction} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          defaultValue={product?.priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value))}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description || ""}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="Amount">Amount</Label>
        <Input
          type="number"
          id="stock"
          name="stock"
          required
          defaultValue={product?.stock || 0}
          min="0"
        />
        {error.stock && (
          <div className="text-destructive">{error.stock}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Product File</Label>
        <CldUploadWidget
          uploadPreset="my_e-commerce"
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            if (result.info && typeof result.info !== "string") {
              setFileUrl(result.info.secure_url);
            }
          }}
        >
          {({ open }) => (
            <Button type="button" onClick={() => open()}>
              Upload File
            </Button>
          )}
        </CldUploadWidget>
        <Input type="hidden" name="fileUrl" value={fileUrl} />
        {fileUrl && (
          <div className="text-sm text-green-600">
            ✅ File uploaded successfully
          </div>
        )}
        {error.fileUrl && (
          <div className="text-destructive">{error.fileUrl}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Product Image</Label>
        <CldUploadWidget
          uploadPreset="my_e-commerce"
          onSuccess={(result: CloudinaryUploadWidgetResults) => {
            if (result.info && typeof result.info != "string") {
              setImageUrl(result.info.secure_url);
            }
          }}
        >
          {({ open }) => (
            <Button type="button" onClick={() => open()}>
              Upload Image
            </Button>
          )}
        </CldUploadWidget>
        <Input type="hidden" name="imageUrl" value={imageUrl} />
        {imageUrl && (
          <Image
            src={imageUrl}
            height={200}
            width={200}
            alt="Product preview"
            className="rounded-lg object-cover"
          />
        )}
        {error.imageUrl && (
          <div className="text-destructive">{error.imageUrl}</div>
        )}
      </div>

      {error._form && <div className="text-destructive">{error._form}</div>}

      <SubmitButton disabled={!fileUrl || !imageUrl} />
    </form>
  );
}

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
