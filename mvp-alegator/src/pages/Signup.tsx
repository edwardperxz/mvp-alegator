import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/ivan-lentes-fondo-transparente.png';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../supabaseClient';

const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  userName: z.string().min(2, "El nombre de usuario debe tener al menos 2 caracteres"),
  email: z.string().email("Introduce un correo electrónico válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  country: z.string().nonempty("El país es obligatorio"),
});

type FormFields = z.infer<typeof schema>;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = React.useState<Error | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema)
  });

  const countries: string[] = [
    "AFGANISTAN", "ALBANIA", "ALEMANIA", "ANDORRA", "ANGOLA", "ANTIGUA Y BARBUDA", 
    "ARABIA SAUDITA", "ARGELIA", "ARGENTINA", "ARMENIA", "AUSTRALIA", "AUSTRIA", 
    "AZERBAIYAN", "BAHAMAS", "BAHREIN", "BANGLADES", "BARBADOS", "BELARUS", 
    "BELGICA", "BELICE", "BENIN", "BHUTAN", "BOLIVIA", "BOSNIA Y HERZEGOVINA", 
    "BOTSUANA", "BRASIL", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", 
    "CABO VERDE", "CAMBOYA", "CAMERUN", "CANADA", "CATAR", "CHAD", "CHILE", "CHINA", 
    "CHIPRE", "COLOMBIA", "COMORAS", "COREA DEL NORTE", "COREA DEL SUR", "COSTA DE MARFIL", 
    "COSTA RICA", "CROACIA", "CUBA", "DINAMARCA", "DOMINICA", "ECUADOR", "EGIPTO", 
    "EL SALVADOR", "EMIRATOS ARABES UNIDOS", "ERITREA", "ESLOVAQUIA", "ESLOVENIA", 
    "ESPAÑA", "ESTADOS UNIDOS", "ESTONIA", "ESWATINI", "ETIOPIA", "FILIPINAS", 
    "FINLANDIA", "FIYI", "FRANCIA", "GABON", "GAMBIA", "GEORGIA", "GHANA", "GRANADA", 
    "GRECIA", "GUATEMALA", "GUINEA", "GUINEA BISSAU", "GUINEA ECUATORIAL", "GUYANA", 
    "HAITI", "HONDURAS", "HUNGRIA", "INDIA", "INDONESIA", "IRAK", "IRAN", "IRLANDA", 
    "ISLANDIA", "ISLAS MARSHALL", "ISLAS SALOMON", "ISRAEL", "ITALIA", "JAMAICA", 
    "JAPON", "JORDANIA", "KAZAJISTAN", "KENIA", "KIRGUISTAN", "KIRIBATI", "KOSOVO", 
    "KUWAIT", "LAOS", "LESOTO", "LETONIA", "LIBANO", "LIBERIA", "LIBIA", "LIECHTENSTEIN", 
    "LITUANIA", "LUXEMBURGO", "MADAGASCAR", "MALASIA", "MALAWI", "MALDIVAS", "MALI", 
    "MALTA", "MARRUECOS", "MAURICIO", "MAURITANIA", "MEXICO", "MICRONESIA", "MOLDAVIA", 
    "MONACO", "MONGOLIA", "MONTENEGRO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "NAURU", 
    "NEPAL", "NICARAGUA", "NIGER", "NIGERIA", "NORUEGA", "NUEVA ZELANDA", "OMAN", 
    "PAISES BAJOS", "PAKISTAN", "PALAU", "PALESTINA", "PANAMA", "PAPUA NUEVA GUINEA", 
    "PARAGUAY", "PERU", "POLONIA", "PORTUGAL", "REINO UNIDO", "REPUBLICA CENTROAFRICANA", 
    "REPUBLICA CHECA", "REPUBLICA DEL CONGO", "REPUBLICA DEMOCRATICA DEL CONGO", 
    "REPUBLICA DOMINICANA", "RUANDA", "RUMANIA", "RUSIA", "SAMOA", "SAN CRISTOBAL Y NIEVES", 
    "SAN MARINO", "SAN VICENTE Y LAS GRANADINAS", "SANTA LUCIA", "SANTO TOME Y PRINCIPE", 
    "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONA", "SINGAPUR", "SIRIA", "SOMALIA", 
    "SRI LANKA", "SUAZILANDIA", "SUDAN", "SUDAN DEL SUR", "SUECIA", "SUIZA", "SURINAM", 
    "TAILANDIA", "TANZANIA", "TAYIKISTAN", "TIMOR ORIENTAL", "TOGO", "TONGA", "TRINIDAD Y TOBAGO", 
    "TUNEZ", "TURKMENISTAN", "TURQUIA", "TUVALU", "UCRANIA", "UGANDA", "URUGUAY", "UZBEKISTAN", 
    "VANUATU", "VATICANO", "VENEZUELA", "VIETNAM", "YEMEN", "YIBUTI", "ZAMBIA", "ZIMBABUE"
];

  const onSubmit = async (data: FormFields) => {
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      });

      if (signUpError) {
        setSignUpError(signUpError);
        console.error("Error de registro:", signUpError.message);
      } else {
        console.log("Registro exitoso!");
        const { error: insertError } = await supabase.from('users').insert([
          {
            id: authData.user?.id, 
            username: data.userName,
            email: data.email,
            first_name: data.name,
            last_name: data.lastName,
            is_active: true,
            password: data.password,
            is_admin: false,
            country: data.country,
            created_at: new Date().toISOString(),
          }
        ]);

        if (insertError) {
          console.error("Error al insertar datos del usuario:", insertError.message);
        } else {
          console.log("Datos del usuario insertados correctamente!");
          navigate('/confirmation', { state: { context: 'signup' } });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setSignUpError(error instanceof Error ? error : new Error("Error desconocido"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="relative flex justify-center z-10">
        <img src={logo} alt="Alegator" className="h-36 md:h-48 lg:h-60 -mb-16 md:-mb-20 lg:-mb-24" />
      </div>
      <div className="bg-[#11372A] p-8 md:p-12 lg:p-16 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-2xl relative z-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 lg:mb-10 text-center">CREAR UNA CUENTA</h2>
        <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label htmlFor="firstName" className="sr-only">Nombre</label>
              <input {...register("name")}
                type="text" id="firstName" placeholder="Nombre" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B]" />
              {errors.name && (
                <div className='text-red-500 text-sm mt-1'>{errors.name.message}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label htmlFor="lastName" className="sr-only">Apellido</label>
              <input {...register("lastName")}
                type="text" id="lastName" placeholder="Apellido" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B]" />
              {errors.lastName && (
                <div className='text-red-500 text-sm mt-1'>{errors.lastName.message}</div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="username" className="sr-only">Nombre de Usuario</label>
            <input {...register("userName")}
              type="text" id="username" placeholder="Nombre de Usuario" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B]" />
            {errors.userName && (
              <div className='text-red-500 text-sm mt-1'>{errors.userName.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Correo</label>
            <input {...register("email")}
              type="email" id="email" placeholder="Correo" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B]" />
            {errors.email && (
              <div className='text-red-500 text-sm mt-1'>{errors.email.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input {...register("password")}
              type="password" id="password" placeholder="Contraseña" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B]" />
            {errors.password && (
              <div className='text-red-500 text-sm mt-1'>{errors.password.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="country" className="sr-only">País</label>
            <select
              id="country"
              {...register("country")}
              className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B]"
            >
              <option value="">Selecciona tu país</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && (
              <div className='text-red-500 text-sm mt-1'>{errors.country.message}</div>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Repetir Contraseña</label>
            <input type="password" id="confirmPassword" placeholder="Repetir Contraseña" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B]" />
          </div>
          {signUpError && (
            <div className='text-red-500 text-sm mt-1'>{signUpError.message}</div>
          )}
          <button disabled={isSubmitting}
            type="submit" className="w-full bg-[#6B9026] text-white py-3 md:py-4 rounded-full hover:bg-[#507A1B] transition-colors text-lg">REGISTRARSE</button>
        </form>
        <div className="mt-6 text-center text-white">
          ¿Ya tienes una cuenta? <br/><Link to="/login" className="text-yellow-400 hover:underline">INICIAR SESIÓN</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;