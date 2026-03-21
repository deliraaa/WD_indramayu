
        // Konfigurasi
        const TOTAL_SOAL = 28;
        
        // State management
        let jawabanUser = {}; // { 1: 'A', 2: 'B', 3: null, ... }
        let nomorAktif = 1; // Nomor soal yang sedang aktif
        let lastClickTime = {}; // Track waktu klik terakhir untuk double-click
        let lastClickedAnswer = {}; // Track jawaban yang terakhir diklik

        // Inisialisasi jawaban user
        function initJawaban() {
            for (let i = 1; i <= TOTAL_SOAL; i++) {
                jawabanUser[i] = null;
                lastClickTime[i] = 0;
                lastClickedAnswer[i] = null;
            }
        }

        // Generate grid nomor soal
        function generateGrid() {
            const gridContainer = document.getElementById('gridSoal');
            gridContainer.innerHTML = '';

            for (let i = 1; i <= TOTAL_SOAL; i++) {
                const kotak = document.createElement('div');
                kotak.className = getClassNomor(i);
                kotak.textContent = i;
                kotak.dataset.nomor = i;
                kotak.addEventListener('click', () => handleKlikNomor(i));
                
                gridContainer.appendChild(kotak);
            }
        }

        // Mendapatkan class untuk nomor berdasarkan state
        function getClassNomor(nomor) {
            let baseClass = 'w-12 h-12 rounded flex items-center justify-center cursor-pointer transition-all duration-200 font-semibold';
            
            // State: Sedang Aktif
            if (nomor === nomorAktif) {
                if (jawabanUser[nomor] !== null) {
                    return `${baseClass} bg-[rgba(41,125,167,1)] text-white border-2 border-[rgba(41,125,167,1)] shadow-lg`;
                } else {
                    return `${baseClass} bg-white border-2 border-[rgba(41,125,167,1)] text-gray-700 shadow-lg`;
                }
            }
            
            // State: Sudah Dijawab
            if (jawabanUser[nomor] !== null) {
                return `${baseClass} bg-[#rgba(41,125,167,1)] text-white border border-[rgba(41,125,167,1)]`;
            }
            
            // State: Belum Dijawab
            return `${baseClass} bg-white border border-gray-300 text-gray-700`;
        }

        // Handle klik nomor
        function handleKlikNomor(nomor) {
            // Set nomor aktif
            nomorAktif = nomor;
            
            // Update tampilan untuk menunjukkan nomor aktif
            updateGrid();
            updateSoalAktif();
            updatePilihanJawaban();
            updateNavigationButtons();
            
            console.log(`Nomor ${nomor} sekarang aktif. Status jawaban:`, jawabanUser[nomor] || 'Belum dijawab');
        }
        
        // Fungsi untuk menangani klik pada pilihan jawaban
        function setupJawabanListeners() {
            const radioButtons = document.querySelectorAll('input[name="jawaban"]');
            
            radioButtons.forEach(radio => {
                radio.addEventListener('click', function(e) {
                    const jawaban = this.value;
                    const currentTime = new Date().getTime();
                    const timeDiff = currentTime - (lastClickTime[nomorAktif] || 0);
                    
                    // Double-click detection (dalam 300ms)
                    if (timeDiff < 300 && lastClickedAnswer[nomorAktif] === jawaban && jawabanUser[nomorAktif] === jawaban) {
                        // Double-click pada jawaban yang sama - batalkan jawaban
                        jawabanUser[nomorAktif] = null;
                        this.checked = false;
                        console.log(`Jawaban soal ${nomorAktif} dibatalkan (double-click)`);
                    } else {
                        // Single click atau klik jawaban berbeda - simpan jawaban
                        jawabanUser[nomorAktif] = jawaban;
                        console.log(`Soal ${nomorAktif} dijawab: ${jawaban}`);
                    }
                    
                    // Update last click time dan answer
                    lastClickTime[nomorAktif] = currentTime;
                    lastClickedAnswer[nomorAktif] = jawaban;
                    
                    // Update UI
                    updateGrid();
                    updateInfo();
                });
            });
        }
        
        // Update pilihan jawaban sesuai soal aktif
        function updatePilihanJawaban() {
            const radioButtons = document.querySelectorAll('input[name="jawaban"]');
            const jawabanTerpilih = jawabanUser[nomorAktif];
            
            radioButtons.forEach(radio => {
                radio.checked = (radio.value === jawabanTerpilih);
            });
        }
        
        // Navigasi soal (Previous/Next)
        function navigasiSoal(direction) {
            if (direction === 'previous' && nomorAktif > 1) {
                nomorAktif--;
            } else if (direction === 'next' && nomorAktif < TOTAL_SOAL) {
                nomorAktif++;
            }
            
            handleKlikNomor(nomorAktif);
        }
        
        // Update status tombol navigasi
        function updateNavigationButtons() {
            const btnPrevious = document.getElementById('btnPrevious');
            const btnNext = document.getElementById('btnNext');
            
            // Disable tombol Previous jika di soal pertama
            if (nomorAktif === 1) {
                btnPrevious.disabled = true;
                btnPrevious.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                btnPrevious.disabled = false;
                btnPrevious.classList.remove('opacity-50', 'cursor-not-allowed');
            }
            
            // Disable tombol Next jika di soal terakhir
            if (nomorAktif === TOTAL_SOAL) {
                btnNext.disabled = true;
                btnNext.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                btnNext.disabled = false;
                btnNext.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }
        
        // Update tampilan nomor soal aktif
        function updateSoalAktif() {
            document.getElementById('soalAktif').textContent = nomorAktif;
        }

        // Update grid (re-render semua nomor)
        function updateGrid() {
            const allKotak = document.querySelectorAll('#gridSoal > div');
            allKotak.forEach(kotak => {
                const nomor = parseInt(kotak.dataset.nomor);
                kotak.className = getClassNomor(nomor);
            });
        }

        // Update info statistik
        function updateInfo() {
            const sudahDijawab = Object.values(jawabanUser).filter(jawaban => jawaban !== null).length;
            const belumDijawab = TOTAL_SOAL - sudahDijawab;
            
            const sudahDijawabEl = document.getElementById('sudahDijawab');
            const belumDijawabEl = document.getElementById('belumDijawab');
            
            if (sudahDijawabEl) sudahDijawabEl.textContent = sudahDijawab;
            if (belumDijawabEl) belumDijawabEl.textContent = belumDijawab;
        }

        // Inisialisasi aplikasi
        function init() {
            initJawaban();
            generateGrid();
            updateInfo();
            updateSoalAktif();
            setupJawabanListeners();
            updateNavigationButtons();
        }

        // Jalankan saat DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }