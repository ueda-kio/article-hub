'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const revalidateTagFromClient = (...arg: Parameters<typeof revalidateTag>) => {
  const [tag] = arg;
  revalidateTag(tag);
};

export const revalidatePathFromClient = (...arg: Parameters<typeof revalidatePath>) => {
  const [originalPath, type] = arg;
  revalidatePath(originalPath, type);
};
