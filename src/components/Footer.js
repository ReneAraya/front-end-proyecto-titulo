import React from 'react';

const Footer = () => {
  return (
    <footer class="bg-white dark:bg-gray-900">
        <div class="mx-auto w-full max-w-screen-xl p-3 py-4 lg:py-8">
            <div class="md:flex md:justify-between">
              <div class="mb-6 md:mb-0">
                  <a href="https://www.inf.ucv.cl/" class="flex items-center">
                      <img src="public\logo_smaller-01.png" class="h-8 me-3" alt="EII PUCV" />
                      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                  </a>
              </div>
              <div class="grid grid-cols-2 gap-8 sm:gap-4 sm:grid-cols-2">
                  <div>
                      <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Sitios oficiales</h2>
                      <ul class="text-gray-500 dark:text-gray-400 font-medium">
                          <li class="mb-4">
                              <a href="https://www.inf.ucv.cl/" class="hover:underline">Escuela de Ingeniería Informatica</a>
                          </li>
                      </ul>
                  </div>

                  <div>
                      <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Ayuda</h2>
                      <ul class="text-gray-500 dark:text-gray-400 font-medium">
                          <li class="mb-4">
                              <p>Envie un correo a </p>
                              <p class="hover:underline ">soporte@pucv.cl</p>
                          </li>
                      </ul>
                  </div>

              </div>
          </div>
          <hr class="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-10" />
          <div class="sm:flex sm:items-center sm:justify-between">
            <p class="text-sm text-gray-500 sm:text-center dark:text-gray-400">&copy; {new Date().getFullYear()} PUCV Escuela de Ingenieria Informatica™. Todos los derechos reservados.</p>
              
              <div class="flex mt-4 sm:justify-center sm:mt-0">
                  <a href="https://facebook.com/informatica.pucv" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                            <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                        </svg>
                      <span class="sr-only">Facebook page</span>
                  </a>
                  <a href="https://x.com/INGENIERIAPUCV" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                        <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                    </svg>
                      <span class="sr-only">Twitter page</span>
                  </a>
                  <a href="https://www.instagram.com/informatica.pucv/?hl=es" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.342 3.608 1.317.975.975 1.255 2.242 1.317 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.342 2.633-1.317 3.608-.975.975-2.242 1.255-3.608 1.317-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.342-3.608-1.317-.975-.975-1.255-2.242-1.317-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.342-2.633 1.317-3.608.975-.975 2.242-1.255 3.608-1.317 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.67.012-4.947.072-1.512.068-2.987.372-4.063 1.448-1.077 1.077-1.381 2.551-1.448 4.063-.06 1.277-.072 1.688-.072 4.947s.012 3.67.072 4.947c.068 1.512.372 2.987 1.448 4.063 1.077 1.077 2.551 1.381 4.063 1.448 1.277.06 1.688.072 4.947.072s3.67-.012 4.947-.072c1.512-.068 2.987-.372 4.063-1.448 1.077-1.077 1.381-2.551 1.448-4.063.06-1.277.072-1.688.072-4.947s-.012-3.67-.072-4.947c-.068-1.512-.372-2.987-1.448-4.063-1.077-1.077-2.551-1.381-4.063-1.448-1.277-.06-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0-2.88 0 1.44 1.44 0 0 0 2.88 0z"/>
                    </svg>
                    <span class="sr-only">Instagram account</span>
                  </a>
              </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
