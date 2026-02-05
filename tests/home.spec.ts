import { expect, test } from '@playwright/test';

test('La home carga correctamente', async ({ page }) => {
  await page.goto('/');
  // Verifica que el título NO esté vacío
  await expect(page).toHaveTitle(/Mi portafolio/); 
});

test('Navegación a la sección "Sobre mí"', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Personaje');
  await expect(page).toHaveURL(/.*#sobre-mi/);
});

test('Navegación a la sección "Misiones"', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Misiones');
  await expect(page).toHaveURL(/.*#experiencia/);
});