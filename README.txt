EQvisor Fintech Pvt. Ltd.
A Startup for startups

Instructions to be strictly followed by all the programmers in this organization:
    1. Use them fucking comments so that others can understand what you have typed and what the particular
       file does. Any file should comprise of atleast 40% comments. 
    2. Files in which you expect someone else to complete the code (for example file written by front-end
       dev requires database dev to work further on), you should mention it in the beggining in a comment
       who needs to takeover (for example //database connection required).
    3. Before pushing the changes into the repository, you should mention the version of the push in the
       form  x.y.z
           x = new ui
           y = major flaw/security breach/change of technologies/change of servers
           z = minor debugs/new code
       Comments should be added each time you push the code, which should indicate what new code has been
       added, or what changes have been done to debug.

Steps:
    1. Either git clone or connect the repository to your vscode
    2. Terminal:
            npm i
            npm run build
            npm start

Repository skull:
EQ-WEB-2.y.z

—→ public
    —→ $ has all the images stored

—→ src

    —→ app
        —→ (authentication)
            —→ _components
                —→ $ Reset Password page
            —→ forgetpassword
                —→ $ page
            —→ investor-login
                —→ $ page
            —→ investor-signup
                —→ $ page
            —→ startup-login
                —→ $ page
            —→ startup-signup
                —→ $ page
        —→ (eqfund)
            —→ _components
                —→ $ header page
                —→ $ notification page
                —→ $ notification card page
            —→ eqfund
                —→ home
                    —→ $ page
                —→ invest
                    —→ $ page
                —→ message
                    —→ $ page
                —→ portfolio
                    —→ $ page
            —→ $ layout page
        —→ (payment)
             —→ $ payment button page           
        —→ api
            —→ $ api routes ??
        —→ fonts ^^
            —→ $ website fonts
        —→ process-investor
            —→ aadhar_verification-investor
                —→ $ page
            —→ bankdetails-investor
                —→ $ page
            —→ digilocker-investor
                —→ _components
                    —→ $ digilocker accept and success pages
                —→ $ page
            —→ document-investor
                —→ _components
                    —→ $ payment button page
                —→ $ page
            —→ face-verification-investor
                —→ $ page
            —→ panprocess-investor
                —→ $ page
            —→ personal_information-investor
                —→ $ page
        —→ process-startup
            —→ aadhar_verification-startup
                —→ $ page
            —→ bankdetails-startup
                —→ $ page
            —→ digilocker-startup
                —→ _components
                    —→ $ digilocker accept and success page
                —→ $ page
            —→ document-startup
                —→ _components
                    —→ $ payment button page
            —→ face-verification-startup
                —→ $ page
            —→ panprocess-investor
                —→ $ page
            —→ personal_information-startup
                —→ $ page
        —→ startup
            —→ documents
                —→ $ page
            —→ personaldetails
                —→ $ page
            —→ team-member
                —→ $ page
            —→ venture-details
                —→ $ page
        —→ v2
            —→ _components
                —→ home                                                             main home page
                    —→ $ FAQ, Footer, HeroSection (video), stat pages
                —→ $ footer and navbar pages
            —→ about
                —→ $ page and css
            —→ contact
                —→ $ page and css
            —→ eqfund
                —→ _components
                    —→ $ navbar page
                —→ messages
                    —→ _components
                        —→ $ chat interface and messaging stuff pages
                    —→ $ page
                —→ portfolio
                    —→ $ page 
                —→ $ page and css
            —→ Eqrate
                —→ form
                    —→ $ page 
                —→ $ page and css
            —→ messages
                —→ _components
                    —→ $ chat interface and messaging stuff pages
                —→ $ page
            —→ postregister
                —→ $ page 
            —→ service
                —→ _components
                    —→ $ footer and navbar pages
                —→ styles
                    —→ $ css pages
                —→ $ page
            —→ startup
                —→ customercare
                    —→ $ page
                —→ dashboard
                    —→ $ page
                —→ eqfund
                    —→ _components 
                        —→ $ navbar page
                    —→ $ page and css
                —→ history
                    —→ $ page
                —→ login
                    —→ $ page
                —→ profile
                    —→ _components
                        —→ $ navbar
                    —→ $ page
                —→ register
                    —→ $ page
            —→ startup_customer_care
                —→ $ page and css
            —→ StartupEqfund
                —→ $ page and css
            —→ styles **
                —→ $ FAQ, herosection, navbar and stat css
            —→ $ page

    —→ components
        —→ forms
            —→ $ personal details page
            —→ $ personal verification page
            —→ $ startup additional information page
            —→ $ startup details form
            —→ $ startup documents forms
        —→ ui **
            —→ $ multiple pages 
        —→ $ startup registration page
        —→ $ step component page

    —→ firebase
        —→ $ investor and startup js files

    —→ hooks
        —→ $ use mobile and use toast hooks

    —→ lib
        —→ $ api configuration and util files









