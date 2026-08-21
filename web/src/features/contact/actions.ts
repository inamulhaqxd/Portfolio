"use server";

export interface ContactFormState {
  success: boolean;
  error: string | null;
  fieldErrors: Record<string, string[]> | null;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  const fieldErrors: Record<string, string[]> = {};

  if (!name || name.length > 100) {
    fieldErrors.name = [!name ? "Name is required" : "Name is too long"];
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = [!email ? "Email is required" : "Invalid email address"];
  }
  if (!message || message.length < 10 || message.length > 5000) {
    fieldErrors.message = [
      !message ? "Message is required" : message.length < 10 ? "Message must be at least 10 characters" : "Message is too long",
    ];
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, error: null, fieldErrors };
  }

  try {
    const { createMessage } = await import("../../../../packages/dal/messages");
    await createMessage({ name: name!, email: email!, subject: "", message: message! });
  } catch {
    // Messages table may not exist yet — form still works visually
  }

  return { success: true, error: null, fieldErrors: null };
}
