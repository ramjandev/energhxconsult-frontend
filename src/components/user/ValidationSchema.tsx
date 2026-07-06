import { z } from "zod";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  otherName: z.string().optional(),
  sex: z.enum(["MALE", "FEMALE"]),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Please upload a valid image file",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported",
    })
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, {
      message: "Max file size is 4MB",
    })
    .optional()
    .or(z.literal(undefined)),
  streetNumber: z.string().min(1, "Last name is required"),
  street: z.string().min(1, "Street name is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z
    .union([
      z.string().min(1, "Enter the Postal code"),
      z.number({ invalid_type_error: "Postal code must be a number" }),
    ])
    .transform((val) => val.toString()),
  countryId: z.string().uuid("Please select a valid country"),
  stateId: z.string().uuid("Please select a valid state"),
});

export type SignUpType = z.infer<typeof signupSchema>;

export const experienceSchema = z.object({
  name: z.string().min(1, "Work engagement name is required"),
  address: z.string().min(1, "Address is required"),
  title: z.string().min(1, "Job title is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export const publicationSchema = z.object({
  publisher: z.string().min(1, "Publisher is required"),
  title: z.string().min(1, "Title is required"),
  authorList: z.string().min(1, "Author list is required"),
  pages: z.string().min(1, "Pages are required"),
  publicationYear: z
    .number({ invalid_type_error: "Year must be a number" })
    .min(1900)
    .max(new Date().getFullYear()),
});

export const referenceSchema = z.object({
  name: z.string().min(1, "Reference name is required"),
});

const dataSchema = z.object({
  experiences: z
    .array(experienceSchema)
    .min(1, "At least one experience required"),
  publications: z.array(publicationSchema).optional(),
  references: z.array(referenceSchema).optional(),
  files: z.array(z.instanceof(File)).optional(),
});

export type UserExperience = z.infer<typeof dataSchema>;
export default dataSchema;
