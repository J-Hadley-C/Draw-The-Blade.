<?php

namespace App\DataFixtures;

use App\Entity\Beat;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class BeatFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $beats = [
            [
                'title' => 'Phantom Grid',
                'genre' => 'Trap',
                'bpm' => 142,
                'key' => 'Am',
                'duration' => '2:47',
                'description' => 'Dark trap instrumental. Heavy 808s, cinematic strings, drill hi-hats.',
                'price' => '29.99',
                'isFree' => true,
                'imagePath' => '1.png',
                'audioPath' => null,
                'inCarousel' => true,
            ],
            [
                'title' => 'Warlord',
                'genre' => 'Drill',
                'bpm' => 144,
                'key' => 'Bm',
                'duration' => '3:02',
                'description' => 'UK Drill energy. Sliding 808s, eerie melody, rolling percussion.',
                'price' => '34.99',
                'isFree' => true,
                'imagePath' => '2.png',
                'audioPath' => null,
                'inCarousel' => true,
            ],
            [
                'title' => 'Ancestral Code',
                'genre' => 'BB',
                'bpm' => 90,
                'key' => 'Gm',
                'duration' => '3:18',
                'description' => 'Boom Bap. Vintage soul samples, crisp snares, deep kicks.',
                'price' => '24.99',
                'isFree' => true,
                'imagePath' => '3.jpg',
                'audioPath' => null,
                'inCarousel' => true,
            ],
            [
                'title' => 'Ember Throne',
                'genre' => 'Trap',
                'bpm' => 138,
                'key' => 'F#m',
                'duration' => '2:55',
                'description' => 'Cinematic trap. Fire melody, punching 808s, half-time feel.',
                'price' => '29.99',
                'isFree' => true,
                'imagePath' => '4.png',
                'audioPath' => null,
                'inCarousel' => true,
            ],
            [
                'title' => 'Satin Blade',
                'genre' => 'R&B',
                'bpm' => 78,
                'key' => 'Dm',
                'duration' => '3:30',
                'description' => 'Smooth R&B. Lush chords, soft bass, delicate percussion.',
                'price' => '39.99',
                'isFree' => true,
                'imagePath' => '5.jpg',
                'audioPath' => null,
                'inCarousel' => true,
            ],
            [
                'title' => 'Bone Street',
                'genre' => 'SexyDrill',
                'bpm' => 145,
                'key' => 'Cm',
                'duration' => '2:58',
                'description' => 'SexyDrill fusion. Melodic drill avec R&B vocal space et dark bass.',
                'price' => '34.99',
                'isFree' => true,
                'imagePath' => '6.jpg',
                'audioPath' => null,
                'inCarousel' => true,
            ],
            [
                'title' => 'Lagos Heat',
                'genre' => 'Afrobeat',
                'bpm' => 105,
                'key' => 'Am',
                'duration' => '3:44',
                'description' => 'Afrobeat. Percussions traditionnelles, guitare et basse groovy.',
                'price' => '29.99',
                'isFree' => true,
                'imagePath' => '7.jpg',
                'audioPath' => null,
                'inCarousel' => true,
            ],
            [
                'title' => 'Mascarade',
                'genre' => 'Kompa',
                'bpm' => 120,
                'key' => 'Gm',
                'duration' => '3:20',
                'description' => 'Kompa moderne. Guitare clean, basse profonde, rythme dansant.',
                'price' => '29.99',
                'isFree' => true,
                'imagePath' => '8.jpg',
                'audioPath' => null,
                'inCarousel' => true,
            ],
            [
                'title' => 'Cipher Seal',
                'genre' => 'Drill',
                'bpm' => 143,
                'key' => 'Em',
                'duration' => '2:50',
                'description' => 'UK Drill instrumental. Dark piano, heavy 808s, triplet flow pockets.',
                'price' => '34.99',
                'isFree' => true,
                'imagePath' => '9.jpg',
                'audioPath' => null,
                'inCarousel' => true,
            ],
            [
                'title' => 'Night Watch',
                'genre' => 'BB',
                'bpm' => 88,
                'key' => 'Fm',
                'duration' => '3:12',
                'description' => 'Boom Bap cinématique. Loop jazz, scratch et kicks profonds.',
                'price' => '24.99',
                'isFree' => true,
                'imagePath' => '10.jpg',
                'audioPath' => null,
                'inCarousel' => true,
            ],
            [
                'title' => 'Velvet Mist',
                'genre' => 'R&B',
                'bpm' => 74,
                'key' => 'Em',
                'duration' => '3:55',
                'description' => "R&B atmosphérique. Chord progressions soul, basse ronde, espace vocal.",
                'price' => '39.99',
                'isFree' => false,
                'imagePath' => '11.jpg',
                'audioPath' => null,
                'inCarousel' => false,
            ],
        ];

        foreach ($beats as $beatData) {
            $beat = new Beat();
            $beat->setTitle($beatData['title']);
            $beat->setGenre($beatData['genre']);
            $beat->setBpm($beatData['bpm']);
            $beat->setKeySignature($beatData['key']);
            $beat->setDuration($beatData['duration']);
            $beat->setDescription($beatData['description']);
            $beat->setPrice($beatData['price']);
            $beat->setIsFree($beatData['isFree']);
            $beat->setImagePath($beatData['imagePath']);
            $beat->setAudioPath($beatData['audioPath']);
            $beat->setInCarousel($beatData['inCarousel']);

            $manager->persist($beat);
        }

        $manager->flush();
    }
}
