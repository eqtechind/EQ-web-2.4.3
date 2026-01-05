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
            —→ bankdetails-investor
            —→ digilocker-investor
                —→ _components
            —→ document-investor
                —→ _components
            —→ face-verification-investor
            —→ panprocess-investor
            —→ personal_information-investor
        —→ process-startup
            —→ aadhar_verification-startup
            —→ bankdetails-startup
            —→ digilocker-startup
                —→ _components
            —→ document-startup
                —→ _components
            —→ face-verification-startup
            —→ panprocess-investor
            —→ personal_information-startup
        —→ startup
            —→ 
            —→ 
            —→ 
        —→ v2

    —→ components
    —→ firebase
    —→ hooks
    —→ lib









